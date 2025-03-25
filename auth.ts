import { PrismaAdapter } from '@/@node_modules/@auth/prisma-adapter'
import NextAuth from '@/@node_modules/next-auth'
import authConfig from '@/auth.config'
import { db } from '@/lib/db'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
