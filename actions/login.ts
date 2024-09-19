'use server'
// equivalent as api route

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'
import { LoginSchema } from '@/schema'
import { AuthError } from 'next-auth'
import * as zod from 'zod'

type LoginRequest = zod.infer<typeof LoginSchema>

export const login = async (values: LoginRequest) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validateFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }
    throw error
  }
}
