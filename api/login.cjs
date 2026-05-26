const AUTH_COOKIE = "df_site_auth";

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

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const password = readRequestPassword(req.body);

  if (!validatePassword(password)) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Invalid password" }));
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Set-Cookie", buildAuthCookie());
  res.end(JSON.stringify({ ok: true }));
};
