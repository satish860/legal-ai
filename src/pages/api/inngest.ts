import axios from 'axios'
import { Inngest } from 'inngest'
import { serve } from 'inngest/next'
import { loadSummarizationChain } from 'langchain/chains'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAI } from 'langchain/llms/openai'

export const inngest = new Inngest({ name: 'legal-ai' })

const summarize = inngest.createFunction(
  { name: 'Summarizer' },
  { event: 'test/summarize' },
  async ({ event, step }) => {
    const response = await axios.get(event.data.url, {
      responseType: 'arraybuffer',
    })

    const pdfData = response.data
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' })
    const loader = new PDFLoader(pdfBlob)
    const docs = await loader.load()
    const envir = process.env.OPENAI_API_KEY
    const model = new OpenAI({ openAIApiKey: envir, temperature: 0 })
    const chain = loadSummarizationChain(model, { type: 'map_reduce' })
    const summary = await chain.call({
      input_documents: docs,
    })
    console.log(summary)
    return { event, body: 'Hello, World!' }
  },
)

export default serve(inngest, [summarize])
