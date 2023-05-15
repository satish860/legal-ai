import { NextApiRequest, NextApiResponse } from "next";
import { inngest } from "./inngest";
import axios from "axios";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { DocumentInput } from "langchain/dist/document";

type Data = {
  url: string;
  text: string;
  docs: DocumentInput<Record<string, any>>[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.get(req.body.url, {
    responseType: "arraybuffer",
  });

  const pdfData = response.data;
  const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
  const loader = new PDFLoader(pdfBlob);
  const docs = await loader.load();

  // const chain = loadSummarizationChain(model, { type: "refine" });
  // const summary = await chain.call({
  //   input_documents: docs,
  // });
  // console.log(summary);

  res.status(200).json({
    url: req.body.url,
    text: "Hello World!!",
    docs: docs,
  });
}
