const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization") || req.query.token || req.body.token;

  if (!token) {
    res.status(401);    //no muestra el 401
    next(new Error("No token was found"));
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      res.json({error: "Invalid token"});
      res.status(401);
      next(err);
      return;
    }
    console.log("payload", payload);
    next();
  });
};
