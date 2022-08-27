import { Request, Response } from 'express';
import z from 'zod';
import User from '../../models/user.model';

const regitserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    name: z.string().min(3)
  })
  .refine(data => data.password == data.confirmPassword, {
    message: "password doesn't match",
    path: ['confirmPassword']
  });

export default async function register(req: Request, res: Response) {
  const validate = regitserSchema.safeParse(req.body);
  if (!validate.success) {
    return res.status(400).json({
      statusCode: 400,
      message: validate.error
    });
  }

  const existedUser = await User.findOne({ where: { email: req.body.email } });
  if (existedUser)
    return res.status(400).json({
      statusCode: 400,
      message: 'Email already exists'
    });

  return res.send('ok');
}
