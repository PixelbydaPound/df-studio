const AUTH_COOKIE = "df_site_auth";
const ENTERPRISE_ROLES_COOKIE = "df_enterprise_roles_auth";

function getAuthToken() {
  return (
    process.env.AUTH_SECRET ||
    process.env.VITE_AUTH_SECRET ||
    "dev-secret-change-me"
  );
}

function getSitePassword() {
  return process.env.SITE_PASSWORD || "";
}

function validatePassword(password) {
  const expected = getSitePassword();
  return expected.length > 0 && password === expected;
}

function getEnterpriseRolesPassword() {
  const configured = process.env.ENTERPRISE_ROLES_PASSWORD || "";
  if (configured && configured !== "undefined") return configured;
  if (process.env.NODE_ENV !== "production") return "roles";
  return getSitePassword();
}

function validateEnterpriseRolesPassword(password) {
  const expected = getEnterpriseRolesPassword();
  return expected.length > 0 && password === expected;
}

function getEnterpriseRolesToken() {
  return `${getAuthToken()}.er`;
}

function buildEnterpriseRolesAuthCookie() {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  const maxAge = 60 * 60 * 24 * 30;

  return `${ENTERPRISE_ROLES_COOKIE}=${getEnterpriseRolesToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function isEnterpriseRolesAuthenticatedCookie(cookieHeader) {
  if (!cookieHeader) return false;

  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const authCookie = cookies.find((cookie) =>
    cookie.startsWith(`${ENTERPRISE_ROLES_COOKIE}=`),
  );

  if (!authCookie) return false;

  const value = authCookie.slice(`${ENTERPRISE_ROLES_COOKIE}=`.length);
  return value === getEnterpriseRolesToken();
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
  buildEnterpriseRolesAuthCookie,
  isAuthenticatedCookie,
  isEnterpriseRolesAuthenticatedCookie,
  readRequestPassword,
  validateEnterpriseRolesPassword,
  validatePassword,
};
