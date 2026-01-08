import * as z from 'zod';

export const firstSignUpFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});
export type FirstSignUpFormSchema = z.infer<typeof firstSignUpFormSchema>;

export const secondSignUpFormSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password is too long'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type SecondSignUpFormSchema = z.infer<typeof secondSignUpFormSchema>;
