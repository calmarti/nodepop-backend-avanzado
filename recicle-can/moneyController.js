'use strict';

const { Requester } = require('cote');

const requester = new Requester({ name: 'nodeapi-money-controller'});

class MoneyController {

  // GET /api/money (desde, hacia, cantidad)
  index(req, res, next) {
    const { desde, hacia, cantidad} = req.params;

    // pedir a los microservicios que hagan la conversión
    requester.send({ 
      type: 'convertir-moneda',
      desde,
      hacia,
      cantidad
    }, resultado => {
      res.json({ result: resultado });
    });

  }

}

module.exports = MoneyController;