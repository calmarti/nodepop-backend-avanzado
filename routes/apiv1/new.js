"use strict";
const express = require("express");
const router = express.Router();

const Advert = require("../../models/Advert");
//const { body, validationResult } = require("express-validator");
const multer = require("multer");
const cote = require("cote");
const ResizeController = require("../../controllers/resizeController");
//const upload = multer({ dest: "public/images/" });
const resizeController = new ResizeController();
//const { round, random } = require("Math");
const resizeImageService = require('../../lib/resizeImageService');

const storage = multer.diskStorage({
  destination: "public/images/",

  filename: function (req, file, cb) {
    const suffix = Date.now() + Math.round(Math.random() * 100);
    const extension = ".jpg";
    console.log("file:", file);
    cb(null, file.fieldname + '-' + suffix + extension);
  },
});

const upload = multer({ storage: storage });

//segundo endpoint: creación de un documento nuevo

router.post(
  "/",

  upload.single("picture"), //guarda la imagen en la ruta del filesystem indicada

  resizeController.index,        //llama al servicio de resizing

  async function (req, res, next) {
    try {
      const { filename } = req.file;

      const newData = { ...req.body, picture: `/images/${filename}` }; 
      console.log(newData);
      const newAdvert = new Advert(newData);
      const newAdvertSaved = await newAdvert.save();


      res.status(201).json({ result: newAdvertSaved });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
