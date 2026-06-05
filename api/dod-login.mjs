import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { recordEvent } = require("../server/analytics-store.cjs");

const DOD_AUTH_COOKIE = "df_dod_auth";

function getAuthToken() {
  return (
    process.env.AUTH_SECRET ||
    process.env.VITE_AUTH_SECRET ||
    "dev-secret-change-me"
  );
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

function sendJson(res, statusCode, payload, headers = {}) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");

  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const password = readRequestPassword(req.body);

  if (!validateDodPassword(password)) {
    sendJson(res, 401, { error: "Invalid password" });
    return;
  }

  try {
    await recordEvent({ type: "dod_unlock" });
  } catch {
    // Login should succeed even if analytics storage fails.
  }

  sendJson(res, 200, { ok: true }, { "Set-Cookie": buildDodAuthCookie() });
}
