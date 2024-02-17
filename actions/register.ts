'use server'

import { db } from '@/lib/db'
import { RegisterSchema } from '@/schema'
import bcrypt from 'bcrypt'
import * as zod from 'zod'
// equivalent as api route

type LoginRequest = zod.infer<typeof RegisterSchema>

export const register = async (values: LoginRequest) => {
  const validateFields = RegisterSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, name, password } = validateFields.data

  const user = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    return { error: 'User already exists!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  //TODO send verification email token

  return { success: 'Email sent!' }
}
