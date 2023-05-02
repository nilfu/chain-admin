import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prisma';

type Response<T> =
  | {
      code: number;
      message: string;
      data?: T;
    }
  | {
      result: any;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<any>>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { ads } = req.query;

    const item = await prisma.project.findFirst({
      where: {
        ads: '',
      },
    });
    await prisma.project.update({
      where: {
        id: item?.id,
      },
      data: {
        ads: ads as string,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'success',
      data: {},
    });
  } catch (err) {
    console.error('Error', err);
    return res.status(500).json({ code: 500, message: '未知错误' });
  }
}
