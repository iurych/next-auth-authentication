'use server'

import { RegisterSchema } from '@/schema'
import * as zod from 'zod'
// equivalent as api route

type LoginRequest = zod.infer<typeof RegisterSchema>

export const register = async (values: LoginRequest) => {
  const validateFields = RegisterSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Email sent!' }
}
