import { GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-static";
type Data = {
  label: string;
  score: number;
};
const API_KEY = process.env.HUGGINGFACE_API_KEY;
const model = "cardiffnlp/twitter-xlm-roberta-base-sentiment";

export async function POST(req: NextRequest) {
  try {
    const { data, finances  } = await req.json();
    const result = await axios.post(
      "https://api-inference.huggingface.co/models/" + model,
      { inputs: data },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    //* Mapping into the emotion and sentiment score
    const sentimentData: Data[] = result.data[0].sort((a: Data, b: Data) =>
      a.label.localeCompare(b.label)
    );
    console.log(sentimentData);
    let totalScore = 0;
    totalScore -= sentimentData[0].score;
    totalScore += sentimentData[1].score;
    totalScore += sentimentData[1].score;
    const sentiment = result.data[0].sort(
      (a: Data, b: Data) => b.score - a.score
    )[0].label;
    //* Hightlights layer
    //! can use without await also
    const fromCompose = JSON.parse(await ComposeData(data, finances));

    const response = {
      fromCompose,
      emotion_sentiment: {
        day: new Date().toISOString(),
        emotion: totalScore * 10, //* To Range it between -10 and 10
        sentiment: sentiment === "positive" || sentiment === "neutral" ? 1 : 0,
      },
    };
    console.log(response);
    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
async function ComposeData(data: string, finances: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const prompt = `Hightlights of this day only key point ${data},\n Finances ${finances}
    
    \n Formate:
 
  "finance": {
      "name_of_transaction": [0, 100] // Negative to send money and Positive for to get money
      // 0: Expense
      // 1: Invesment
      
      //...
  },
  

  "task": {
    "daily": [["Date Time", "task"]],
    "weekly": [[0, "task"]],
    "yearly": [[2, "task"]],
    
    // 0: @New Not scheduled, 
    // 1: @New scheduled (DateTime/ Date), 
    // 2: @New Daily Progress, 
    // 3: Incomplete
    // 4: Still in progress
    // 5: Done
    
    //...
    extract data from finances also must be included bad good etc 
    only important finances not all finances
    understand this and create the hightlighta with finances also incluse them also

    `;

  const schema = {
    type: SchemaType.OBJECT,
    properties: {
      highlights: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
        minItems: 1, // Ensure at least one string highlight
      },
      fromAI: {
        description:
          "Want ot say something to user any tip, congratulations etc",
        type: SchemaType.STRING,
      },
    },
    required: ["highlights", "fromAI"], // highlights is required
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema as Schema,
    },
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
