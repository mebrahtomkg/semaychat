import * as z from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().optional(),
  email: z.email({
    error: (iss) =>
      !iss.input ? 'Email address is required' : 'Invalid email address',
  }),
  password: z
    .string()
    .trim()
    .min(6, {
      error: (iss) =>
        !iss.input
          ? 'Password is required'
          : 'Password must be at least 6 characters',
    })
    .max(50, 'Password is too long'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
