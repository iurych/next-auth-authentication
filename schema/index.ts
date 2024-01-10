import * as z from 'zod'

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'must be a string',
    })
    .email('Email is required'),
  password: z.string().min(1, {
    message: 'Password must have at least one character',
  }),
})
