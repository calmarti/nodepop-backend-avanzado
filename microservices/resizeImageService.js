"use strict";
const jimp = require("jimp");
const { Responder } = require("cote");

const responder = new Responder({ name: "resize-image-service" });

responder.on("resize-image", async (req, done) => {
  const { path } = req;
 
  async function main() {
    try {
      const image = await jimp.read(path);

      await image.resize(100, 100);

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
