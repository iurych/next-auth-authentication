/**
 * @description: Public route
 * An array of public route that are accessible to all users
 * These routes does not require authentication
 * @type {String[]}
 */

export const publicRoute = ['/']

/**
 * @description: Privete route
 * An array of protected route that are accessible to authenticated users
 * These routes does require authentication
 * @type {String[]}
 */
export const authRoutes = ['/auth/login', '/auth/register']

/**
 * @description Prefix route
 * Prefix for API authenticated routes
 * Routes that start with this prefix are to authenticates purposes
 * @type {String}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * @description Default login redirect
 * The default path to redirect to after login
 * @type {String}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
