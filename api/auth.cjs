const { isAuthenticatedCookie } = require("./_auth-config.cjs");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const authenticated = isAuthenticatedCookie(req.headers.cookie);

  res.statusCode = authenticated ? 200 : 401;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ authenticated }));
};
