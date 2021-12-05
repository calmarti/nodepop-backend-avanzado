//const { User } = require("../models");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { now } = require("mongoose");

//¿si tiene un sólo método no podríamos reeemplazar la clase por una función?

class LoginController {
  async auth(req, res, next) {
    try {
      const { email, password } = req.body;
      //console.log(req.body)
      const user = await User.findOne({ email });
      //console.log(user)
      if (!user || !(await user.comparePasswords(password))) {
        res.status(401).json({ Error: "Wrong email or password" });
        return;
      }

      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            next(err);
            return;
          }
          res.json({ token: token });
        }
      );
    } catch (err) {
      next(err); //next()
    }
  }
}

module.exports = LoginController;

//Mini-guia:
//1.POST /api/authenticate para hacer login y devolver un token JWT
//2.GET /api/anuncios incluyendo el JWT en una cabecera o query-string hará la peticióncorrecta (200 OK)
//3.GET /api/anuncios sin token responderá con un código de status HTTP 401 y un json con info del error
//4.GET /api/anuncios con un token caducado responderá con un código de status HTTP 401 y un json con info del error
//El API tendrá al menos un usuario con email: user@example.com y clave 1234
