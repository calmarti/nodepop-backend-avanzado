const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization") || req.query.token || req.body.token;

  if (!token) {
    const err = new Error("An auth token was expected");
    err.status = 401;
    next(err);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      err.message = "Invalid token";
      err.status = 401;
      next(err);
      return;
    }

    req.authUserId = payload.id;
    next();
  });
};
