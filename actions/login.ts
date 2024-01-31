'use server'

import { LoginSchema } from '@/schema'
import * as zod from 'zod'
// equivalent as api route

type LoginRequest = zod.infer<typeof LoginSchema>

export const login = async (values: LoginRequest) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Email sent!' }
}
