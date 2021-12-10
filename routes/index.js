'use strict';

const router = require('express').Router();
const fs = require('fs');
const path = require('path');


//Home que renderiza la documentación usando strapdown.js
//Contiene enlace a la ruta demo

router.get('/', async function (req, res, next) {
  try {
    const filename = path.join(__dirname, '../README.md');
    const readme = await new Promise((res, rej) => 
      fs.readFile(filename, 'utf8', (err, data) => err ? rej(err) : res(data) )
    );
    res.render('index', {title: 'Nodepop', readme });
  } catch (err) { return next(err); }
});

module.exports = router;