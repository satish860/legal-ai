// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from '../../xata'
import { JudgmentsRecord } from '@/types';

type Data = {
  judgement: JudgmentsRecord[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const xata = getXataClient();
  const page = await xata.db.judgments.getPaginated({
    pagination: {
      size: 15,
    },
  });
  
  console.log(page.records);
  res.status(200).json({ judgement: page.records })
}
