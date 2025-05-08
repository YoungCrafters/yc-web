import { z } from 'zod'

// Constants
export const AUTH_STEPS = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
} as const

// Zod Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Types
export type AuthStep = typeof AUTH_STEPS[keyof typeof AUTH_STEPS]
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export interface AuthWizardProps {
  initialStep?: AuthStep
  onAuthSuccess?: () => void
  className?: string
} 