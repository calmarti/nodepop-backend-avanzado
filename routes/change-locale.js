const express = require("express");
const router = express.Router();

router.get("/:locale", (req, res, next) => {
    console.log('hey')
    const locale = req.params.locale;
    res.cookie('nodepop-locale', locale, {
    maxAge: 1000*60*60*24*30
    })

    res.redirect(req.get('referer'))
});

module.exports = router;