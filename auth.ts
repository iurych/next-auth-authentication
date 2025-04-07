import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ token, session }) {
      return session
    },
    async jwt({ token }) {
      console.log({ token })
      return token
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})
