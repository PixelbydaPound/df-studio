const AUTH_COOKIE = "df_site_auth";

function getAuthToken() {
  return (
    process.env.AUTH_SECRET ||
    process.env.VITE_AUTH_SECRET ||
    "dev-secret-change-me"
  );
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

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const authenticated = isAuthenticatedCookie(req.headers.cookie);
  sendJson(res, authenticated ? 200 : 401, { authenticated });
}
