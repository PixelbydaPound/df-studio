import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { readStats } = require("../../server/analytics-store.cjs");
const { isAuthenticatedCookie } = require("../../server/dev-auth-config.cjs");

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

  if (!isAuthenticatedCookie(req.headers.cookie)) {
    sendJson(res, 401, { error: "Unauthorized" });
    return;
  }

  try {
    const stats = await readStats();
    sendJson(res, 200, stats);
  } catch {
    sendJson(res, 500, { error: "Failed to read analytics" });
  }
}
