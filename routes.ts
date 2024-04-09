/**
 * Public routes are routes that are accessible to everyone without authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Auth routes used to authenticate users. These routes are used to authenticate users.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * A prefix for all API routes.
 * @type {string}
 */
export const apiPrefixRoute = "/api/auth";

/**
 * A defualt route to redirect to after login.
 * @type {string[]}
 */
export const DEFUALT_LOGIN_REDIRECT = "/settings";
