"use strict";
const mongoose = require("mongoose");
const app = require("../app");

const advertSchema = mongoose.Schema({
  name: { type: String, required: true },
  sale: { type: Boolean, required: true },
  price: { type: Number, required: true },
  tags: { type: [String] },
  picture: { type: String },
});

advertSchema.statics.customFind = function (filter, skip, limit, sort, select) {
  const query = Advert.find(filter);

  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(select);

  return query.exec();
};

const Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
