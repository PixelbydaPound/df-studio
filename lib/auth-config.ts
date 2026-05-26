export const AUTH_COOKIE = "df_site_auth";

export function getAuthToken(): string {
  return (
    process.env.AUTH_SECRET ||
    process.env.VITE_AUTH_SECRET ||
    "dev-secret-change-me"
  );
}

export function getSitePassword(): string {
  return process.env.SITE_PASSWORD || process.env.VITE_SITE_PASSWORD || "";
}

export function validatePassword(password: string): boolean {
  const expected = getSitePassword();
  return expected.length > 0 && password === expected;
}

export function buildAuthCookie(): string {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  const maxAge = 60 * 60 * 24 * 30;

  return `${AUTH_COOKIE}=${getAuthToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export function isAuthenticatedCookie(cookieHeader?: string): boolean {
  if (!cookieHeader) return false;

  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const authCookie = cookies.find((cookie) =>
    cookie.startsWith(`${AUTH_COOKIE}=`),
  );

  if (!authCookie) return false;

  const value = authCookie.slice(`${AUTH_COOKIE}=`.length);
  return value === getAuthToken();
}
