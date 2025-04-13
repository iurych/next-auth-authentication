'use server'
// equivalent as an api route

import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
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

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email do not exist!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    )
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )
    return { success: 'Confirmation email sent!' }
  }

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
