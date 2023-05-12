import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import {PDFLoader} from 'langchain/document_loaders/fs/pdf';
import  { OpenAI } from 'langchain/llms/openai';
import { loadSummarizationChain } from 'langchain/chains';

type Data = { 
  url: string;
  text: string; 
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.get(req.body.url, {
    responseType: "arraybuffer",
  })

  const pdfData = response.data;
  const pdfBlob  = new Blob([pdfData], { type: "application/pdf" });
  const loader = new PDFLoader(pdfBlob);
  const docs =  await loader.load();
  const envir = process.env.OPENAI_API_KEY;
  const model = new OpenAI({ openAIApiKey: envir, temperature: 0});
  const chain = loadSummarizationChain(model, { type: 'map_reduce'});
  const summary = await chain.call({
    input_documents: docs,
  })
  console.log(summary);

  res.status(200).json({ url: req.body.url, text: summary.text });
}
