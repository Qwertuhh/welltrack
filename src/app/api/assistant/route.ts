import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function POST(req: NextRequest) {
  try {
    const { userData, issue } = await req.json();
    const prompt = `
      You are a counselor. Counsel this child in an interactive manner - ask questions and give advice in a very concise and professional way. 
      First, listen to the issue from the user. The issue is 
      Don't repeat words that will make the user angry. 
      Use all the data given to you in a nice and concise format.
      
      His/Her data: '${userData}'
      User Issue: ${issue}
      `;
    const result = await model.generateContent(prompt);

    return NextResponse.json(
      { response: result.response.text() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}

export { POST };
