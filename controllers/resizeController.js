"use strict";

const { Requester } = require("cote");
const requester = new Requester({ name: "resize-image-controller" });

class ResizeController {
  index(req, res, next) {
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
