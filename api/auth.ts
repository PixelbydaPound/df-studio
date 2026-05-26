import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthenticatedCookie } from "../lib/auth-config";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookieHeader = req.headers.cookie;

  if (!isAuthenticatedCookie(cookieHeader)) {
    return res.status(401).json({ authenticated: false });
  }

  return res.status(200).json({ authenticated: true });
}
