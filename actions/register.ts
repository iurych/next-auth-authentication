'use server'

import bcrypt from '@/@node_modules/@types/bcryptjs'
import * as zod from '@/@node_modules/zod'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { RegisterSchema } from '@/schema'
// equivalent as api route

type LoginRequest = zod.infer<typeof RegisterSchema>

export const register = async (values: LoginRequest) => {
  const validateFields = RegisterSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, name, password } = validateFields.data

  const checkUser = await getUserByEmail(email)

  if (checkUser) {
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

  // TODO send verification email token and if success send to logging page

  return { success: 'User created' }
}
