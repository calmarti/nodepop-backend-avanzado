"use strict";

require('dotenv').config();
const mongoose = require('mongoose');
require("./lib/connectMongoose");
const Advert = require('./models/Advert');
const User = require('./models/User');
const initialData = require("./advertsSample.json");

TODO: //No cierra la conexión! 


main().catch((err) => console.log("Hubo un error: ", err.message));

async function main() {
  await initUsers();
  await initAdverts();
  mongoose.connection.close();
}



async function initUsers() {
  const deleted = await User.deleteMany();
  console.log(`Se han eliminado ${deleted.deletedCount} usuarios`);
  const users = await User.create([
    { email: "admin@example.com", password: await User.hashPassword("1234") },
  ]);
  //   new User([{
  //     email: 'admin@example.com',
  //     password: await User.hashPassword("1234"),
  //   }]).save();

  console.log(
    `La base de datos se ha inicializado con ${users.length} usuario`
  );
}

async function initAdverts() {
  const deleted = await Advert.deleteMany();
  console.log(`Se han eliminado ${deleted.deletedCount} anuncios`);
  const adverts = await Advert.insertMany(initialData.adverts);
  console.log(
    `La base de datos se ha inicializado con ${adverts.length} anuncios`
  );
}
