import { auth } from '@/auth'
export default auth((req) => {
  console.log('ROUTE: ', req.nextUrl.pathname)
})
// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
