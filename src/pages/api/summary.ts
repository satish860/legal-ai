import { NextApiRequest, NextApiResponse } from "next";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const fileUrl  = req.query.url as string;
  const name = fileUrl.split(".")[0];
  res.status(200).json({result: ".co.in"});
  console.log(fileUrl);
}
