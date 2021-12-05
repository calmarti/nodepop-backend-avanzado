'use strict';

// Servicio de conversión de moneda

const { Responder } = require('cote');

// declarar el microservicio
const responder = new Responder({ name: 'servicio de moneda' });

// almacen de datos del microservicio
const rates = {
  usd_eur: 0.89,
  eur_usd: 1.11
};

// logica del microservicio
responder.on('convertir-moneda', (req, done) => {
  const { desde, hacia, cantidad } = req;
  console.log('servicio:', desde, hacia, cantidad, Date.now());

  // calcular el resultado
  const resultado = rates[`${desde}_${hacia}`] * cantidad;

  done(resultado);
})