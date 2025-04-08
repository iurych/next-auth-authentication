import '@auth/core/adapters'
import { UserRole } from '@prisma/client'
import { DefaultSession } from 'next-auth'

export type extendedUser = DefaultSession['user'] & {
  role: 'USER' | 'ADMIN'
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      role: UserRole
    }
  }
}
