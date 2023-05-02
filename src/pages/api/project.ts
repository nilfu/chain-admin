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
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { id, status } = req.body;

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        status,
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
