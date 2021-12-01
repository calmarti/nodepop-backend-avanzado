var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();


require("./lib/connectMongoose");
const { isApiRequest } = require("./lib/utils");
const LoginController = require('./controllers/loginController');


//set up del módulo de internacionalización y localización
const i18n = require("./lib/i18nConfig");

const jwtAuth = require("./lib/jwtAuthMiddleware");


//prueba de i18n
//i18n.setLocale("es");
// console.log(i18n.__("Welcome to Nodefoo"));

// configuración de las vistas
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


const loginController = new LoginController()


//endpoints de la API

app.post("/apiv1/auth", loginController.auth);

app.use("/apiv1/adverts", jwtAuth, require("./routes/apiv1/adverts")); //para búsquedas con o sin filtros
app.use("/apiv1/adverts/new", jwtAuth, require("./routes/apiv1/new")); //para crear un nuevo documento
app.use("/apiv1/adverts/tags", jwtAuth, require("./routes/apiv1/tags")); //para obtener la lista de las etiquetas

//middleware de i18n
app.use(i18n.init);

//rutas de front-end
app.use("/change-locale", require("./routes/change-locale"));
app.use("/", require("./routes/index"));

// middleware que captura errores 404 y lo pasa al gestor de errores
app.use(function (req, res, next) {
  next(createError(404));
});

// gestor de errores
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  //renderizado del error según el destino de la petición (api o front-end)
  if (isApiRequest(req)) {
    return res.json({ error: err.message });
  }

  res.render("error");
});

module.exports = app;

