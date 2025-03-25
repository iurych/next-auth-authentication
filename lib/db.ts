/* eslint-disable no-var */
import { PrismaClient } from '@/@node_modules/@prisma/client'

export const db = globalThis.prisma || new PrismaClient()

declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
