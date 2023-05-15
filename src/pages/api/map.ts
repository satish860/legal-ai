import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  summary: string;
};

const template = `Write a concise summary of the following:
"{text}"
CONCISE SUMMARY:`;

export const DEFAULT_PROMPT = new PromptTemplate({
  template,
  inputVariables: ["text"],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const text = req.body.text;
  const envir = process.env.OPENAI_API_KEY;
  const model = new OpenAI({ openAIApiKey: envir, temperature: 0 });
  const chain = new LLMChain({ llm: model, prompt: DEFAULT_PROMPT });
  const result = await chain.call({ text: text });
//   console.log(result);
  res.status(200).json({ summary: result.text });
}
