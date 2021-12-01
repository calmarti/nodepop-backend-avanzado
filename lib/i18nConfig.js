const i18n = require("i18n");
const path = require("path");

i18n.configure({
  locales: ["en", "es", "fr"], //idiomas que soporta nodepop
  directory: path.join(__dirname, "..", "/locales"),
  defaultLocale: "en",
  autoReload: true, //watch for changes in JSON files to reload locale on updates - defaults to false
  syncFiles: true, //sync locale information across all files - defaults to false
  cookie: "nodepop-locale"
});

//para usar i18n en scripts:
i18n.setLocale("en");

module.exports = i18n;
