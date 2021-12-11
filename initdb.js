"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
require("./lib/connectMongoose");
const Advert = require("./models/Advert");
const User = require("./models/User");
const initialData = require("./advertsSample.json");

main().catch((err) => console.log("Hubo un error: ", err.message));

async function main() {
  await initUsers();
  await initAdverts();
  mongoose.connection.close();
  process.exit(0)
}

async function initUsers() {
  const deleted = await User.deleteMany();
  console.log(`Se ha eliminado ${deleted.deletedCount} usuarios`);
  const users = await User.create([
    { email: "admin@example.com", password: await User.hashPassword("1234") },
  ]);

  console.log(
    `La base de datos se ha inicializado con ${users.length} usuario`
  );
}

async function initAdverts() {
  const { deletedCount } = await Advert.deleteMany();
  console.log(`Se han eliminado ${deletedCount} anuncios`);
  const result = await Advert.insertMany(initialData.adverts);
  console.log(
    `La base de datos se ha inicializado con ${result.length} anuncios`
  );
}
