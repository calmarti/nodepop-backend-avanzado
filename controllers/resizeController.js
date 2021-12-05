"use strict";

const { Requester } = require("cote");
const requester = new Requester({ name: "resize-image-service" });

class ResizeController {
  index(req, res, next) {
    console.log("desde el controller:", req.file);
    requester.send(
      {
        type: "resize-image",
        path: req.file.path,
      },
      (result) => console.log("respuesta:", result)
    );
    next();
  }
}

module.exports = ResizeController;
