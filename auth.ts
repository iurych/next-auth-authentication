import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'
import { getUserById } from './data/user'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow without email verification
      if (account?.provider !== 'credentials') return true

      if (!user.id) return false
      const existingUser = await getUserById(user.id)

      // prevent sign in if email is not verified
      if (!existingUser?.emailVerified) return false
      //TODO: add 2FA check
      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.sub && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const user = await getUserById(token.sub)
      console.log(user)
      if (!user) return token

      token.role = user.role
      return token
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})
