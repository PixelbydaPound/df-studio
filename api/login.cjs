const {
  buildAuthCookie,
  readRequestPassword,
  validatePassword,
} = require("./_auth-config.cjs");

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
