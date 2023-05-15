import { NextApiRequest, NextApiResponse } from "next";
import { inngest } from "./inngest";
import axios from "axios";

type Data = {
  url: string;
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.get(req.body.url, {
    responseType: "arraybuffer",
  });
  console.log(response);

  res.status(200).json({ url: req.body.url, text: "Hello World!!" });
}
