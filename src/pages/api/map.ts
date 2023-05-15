import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

type Data = {
  summary: string;
};

const template = `Write a concise summary of the following:
"{text}"
CONCISE SUMMARY:`;
const envir = process.env.OPENAI_API_KEY;

const model = new OpenAI({ openAIApiKey: envir, temperature: 0 });

export const config = {
  runtime: "edge",
};

export const DEFAULT_PROMPT = new PromptTemplate({
  template,
  inputVariables: ["text"],
});

export default async (request: NextRequest) => {
  const { text } = await request.json();

  const promptText = await DEFAULT_PROMPT.format({ text });
  const result = await model.call(promptText);
  return NextResponse.json({
    summary: result,
  });
};
