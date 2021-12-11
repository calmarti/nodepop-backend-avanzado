'use strict';
var express = require('express');
var router = express.Router();

const Advert = require('../models/Advert');
const { nameFilter, priceRangeFilter } = require('../lib/utils');

//Interfaz frontend tipo 'demo' del endpoint GET /apiv1/adverts del API

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
        nameFilter(name, filter);

        const price = req.query.price;
        priceRangeFilter(price, filter);


        const adverts = await Advert.customFind(filter, skip, limit, sort, select);

        res.locals.adverts = adverts;

        res.render('demo', { title: 'Nodepop' });
    }
    catch (err) {
        next(err);
    }
});



module.exports = router;

