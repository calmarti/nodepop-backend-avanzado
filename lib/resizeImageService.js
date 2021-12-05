"use strict";
const jimp = require("jimp");
const { Responder } = require("cote");
//const { connection } = require("mongoose");

const responder = new Responder({ name: "resize-image-service" });

responder.on("resize-image", async (req, done) => {
  const { path } = req;
  console.log("desde el worker:", path);

  async function main() {
    try {
      // Read the image.
      const image = await jimp.read(path);

      // Resize the image to width 150 and auto height.
      await image.resize(100, 100);

      // Save and overwrite the image
      await image.writeAsync(path);
    } catch (err) {
      console.log(err);
    }
    return "Image resized";
  }

  const result = await main();
  done(result);
});

module.exports = responder;
