import { NextApiRequest, NextApiResponse } from 'next'
import { inngest } from './inngest'

type Data = {
  url: string
  text: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await inngest.send({
    name: 'test/summarize',
    data: {
      url: req.body.url,
    },
  })
  res.status(200).json({ url: req.body.url, text: 'Hello World!!' })
}
