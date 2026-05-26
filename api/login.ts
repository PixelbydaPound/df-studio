import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildAuthCookie, validatePassword } from "../lib/auth-config";
import { readRequestPassword } from "./_request-password";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const password = await readRequestPassword(req);

  if (!validatePassword(password)) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.setHeader("Set-Cookie", buildAuthCookie());
  return res.status(200).json({ ok: true });
}
