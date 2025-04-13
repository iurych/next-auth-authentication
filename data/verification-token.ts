import { db } from '@/lib/db'

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationEmail = await db.verificationToken.findFirst({
      where: {
        token,
      },
    })
    return verificationEmail
  } catch (error) {
    console.error('Error fetching verification token:', error)
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationEmail = await db.verificationToken.findFirst({
      where: {
        email,
      },
    })
    return verificationEmail
  } catch (error) {
    console.error('Error fetching verification token:', error)
    return null
  }
}
