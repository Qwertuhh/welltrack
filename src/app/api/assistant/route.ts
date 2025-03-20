import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function POST(req: NextRequest) {
  try {
    const { userData } = await req.json();

    const prompt = `
      your are a counseller counsell this child 
      in intractive mannger ask question and give advice in very conicent way and in concise manner
      His/Her data: '${userData}'

      Use all data that i given to you
      In Nice concise Formate
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
