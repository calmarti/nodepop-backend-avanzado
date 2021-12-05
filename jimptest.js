const jimp = require("jimp");

async function main() {
  try {
    // Read the image.
    const image = await jimp.read("./public/images/aspiradora_lg.png");

    // Resize the image to width 150 and auto height.
    await image.resize(100, 100);

    // Save and overwrite the image
    await image.writeAsync("./public/images/aspiradora_lg.png");

  } catch (err) {
    console.log(err);
  }
}

main();
