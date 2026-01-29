import * as z from 'zod';

export const logInSchema = z.object({
  email: z.email({
    error: (iss) =>
      !iss.input ? 'Email address is required' : 'Invalid email address',
  }),
  password: z
    .string()
    .trim()
    .min(6, {
      error: (iss) =>
        !iss.input ? 'Password is required' : 'Invalid password',
    })
    .max(50, 'Invalid password'),
});

export type LogInSchema = z.infer<typeof logInSchema>;
