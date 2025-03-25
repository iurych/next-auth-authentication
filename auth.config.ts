import type { NextAuthConfig } from '@/@node_modules/next-auth'
import Credentials from '@/@node_modules/next-auth/providers/credentials'

import bcrypt from '@/@node_modules/@types/bcryptjs'
import { getUserByEmail } from '@/data/user'
import { LoginSchema } from '@/schema'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { email, password } = validateFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
