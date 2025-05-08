import { z } from 'zod'

export enum UserType {
  MENTEE = 'MENTEE',
  MENTOR = 'MENTOR'
}

export const signInSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signUpSchema = signInSchema.extend({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'Name must be at least 2 characters'),
  lastName: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  userType?: UserType;
} 