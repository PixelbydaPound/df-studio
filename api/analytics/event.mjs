import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { recordEvent, VALID_EVENT_TYPES } = require("../../server/analytics-store.cjs");

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function readEventBody(body) {
  if (body && typeof body === "object") {
    return body;
  }

  if (typeof body === "string" && body.length > 0) {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }

  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const body = readEventBody(req.body);

  if (!body || typeof body.type !== "string" || !VALID_EVENT_TYPES.has(body.type)) {
    sendJson(res, 400, { error: "Invalid event" });
    return;
  }

  try {
    const stats = await recordEvent({
      type: body.type,
      projectId: typeof body.projectId === "string" ? body.projectId : undefined,
    });

    sendJson(res, 200, { ok: true, updatedAt: stats.updatedAt });
  } catch (error) {
    sendJson(res, 400, {
      error: error instanceof Error ? error.message : "Invalid request",
    });
  }
}
