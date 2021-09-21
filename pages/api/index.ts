import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const success = {
    message: 'Welcome Back',
  };
  const error = {
    message: 'Something went wrong',
  };

  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (email === 'admin@admin.com' && password === 'admin') {
      res.status(200).json(success);
    } else {
      res.status(401).json(error);
    }
  }
  res.status(400).json({});
};
