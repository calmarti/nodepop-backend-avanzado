'use strict';
const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');
const { nameFilter, priceRangeFilter } = require('../../lib/utils');

//Primer endpoint: lista total y búsquedas con filtros 


router.get('/', async function (req, res, next) {

    try {

        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;
        const select = req.query.select;

        const filter = {};

        const sale = req.query.sale;
        if (sale) filter.sale = sale;

        const tags = req.query.tags;
        if (tags) filter.tags = tags;

        const name = req.query.name;
        nameFilter(name, filter);       //filtro auxiliar por primeras letras del nombre

        const price = req.query.price;
        priceRangeFilter(price, filter); //filtro auxiliar para el rango de precios

        const adverts = await Advert.customFind(filter, skip, limit, sort, select);

        res.json({ result: adverts });
    }
    catch (err) {
        next(err);
    }
});


module.exports = router;
