var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


//OJO: cambiar dirección del REPO en el README!!!!
//TODO muestra de 5 adverts no de 20!!! (subir las fotos con el ms)
//TODO limpieza de código (segunda vuelta)
//TODO arreglar cierre de conexión al inicializar bd 


var app = express();

// app.locals.title = 'Nodepop'

require("./lib/connectMongoose");
const { isApiRequest } = require("./lib/utils");

//carga del controlador de autenticación en el API
const LoginController = require("./controllers/loginController");

//set up del módulo de internacionalización y localización
const i18n = require("./lib/i18nConfig");

//middleware de validación del JWT
const jwtAuth = require("./lib/jwtAuthMiddleware");

// configuración de las vistas
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//intanciación del controlador de autenticación en el API
const loginController = new LoginController();


//middleware de internacionalización y localización (i18n)
app.use(i18n.init);

//rutas de front-end
app.use("/change-locale", require("./routes/change-locale"));
app.use("/demo", require("./routes/demo"));
app.use("/", require("./routes/index"));

//endpoints de la API
app.post("/apiv1/auth", loginController.auth);
app.use("/apiv1/adverts", jwtAuth, require("./routes/apiv1/adverts"));     //GET /apiv1/adverts
app.use("/apiv1/adverts", jwtAuth, require("./routes/apiv1/newAdvert"));         //POST /apiv1/adverts
app.use("/apiv1/adverts/tags", jwtAuth, require("./routes/apiv1/tags"));   //GET /apiv1/adverts/tags


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
