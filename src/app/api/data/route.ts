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
    const { data } = await req.json();
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

    const response = {
      day: new Date().toDateString(),
      emotion: totalScore * 10, //* To Range it between -10 and 10
      sentiment: sentiment === 'positive' || sentiment === 'neutral' ? 1 : 0,
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
