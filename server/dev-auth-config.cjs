const AUTH_COOKIE = "df_site_auth";
const DOD_AUTH_COOKIE = "df_dod_auth";

function getAuthToken() {
  return (
    process.env.AUTH_SECRET ||
    process.env.VITE_AUTH_SECRET ||
    "dev-secret-change-me"
  );
}

function getSitePassword() {
  return process.env.SITE_PASSWORD || process.env.VITE_SITE_PASSWORD || "";
}

function validatePassword(password) {
  const expected = getSitePassword();
  return expected.length > 0 && password === expected;
}

function buildAuthCookie() {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  const maxAge = 60 * 60 * 24 * 30;

  return `${AUTH_COOKIE}=${getAuthToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function isAuthenticatedCookie(cookieHeader) {
  if (!cookieHeader) return false;

  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const authCookie = cookies.find((cookie) =>
    cookie.startsWith(`${AUTH_COOKIE}=`),
  );

  if (!authCookie) return false;

  const value = authCookie.slice(`${AUTH_COOKIE}=`.length);
  return value === getAuthToken();
}

function getDodAuthToken() {
  return `${getAuthToken()}:dod-case-study`;
}

function getDodCaseStudyPassword() {
  return process.env.DOD_CASE_STUDY_PASSWORD || "";
}

function validateDodPassword(password) {
  const expected = getDodCaseStudyPassword();
  return expected.length > 0 && password === expected;
}

function buildDodAuthCookie() {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  const maxAge = 60 * 60 * 24 * 7;

  return `${DOD_AUTH_COOKIE}=${getDodAuthToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function isDodAuthenticatedCookie(cookieHeader) {
  if (!cookieHeader) return false;

  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const authCookie = cookies.find((cookie) =>
    cookie.startsWith(`${DOD_AUTH_COOKIE}=`),
  );

  if (!authCookie) return false;

  const value = authCookie.slice(`${DOD_AUTH_COOKIE}=`.length);
  return value === getDodAuthToken();
}

function readRequestPassword(body) {
  if (body && typeof body === "object" && "password" in body) {
    const password = body.password;
    if (typeof password === "string") {
      return password;
    }
  }

  if (typeof body === "string" && body.length > 0) {
    try {
      const parsed = JSON.parse(body);
      return typeof parsed.password === "string" ? parsed.password : "";
    } catch {
      return "";
    }
  }

  return "";
}

module.exports = {
  buildAuthCookie,
  buildDodAuthCookie,
  isAuthenticatedCookie,
  isDodAuthenticatedCookie,
  readRequestPassword,
  validatePassword,
  validateDodPassword,
};
