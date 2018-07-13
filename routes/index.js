'use strict';

// const request = require('request');
const express = require('express');
const request = require('request-promise');
const router = express.Router();


// home page get handler
router.get('/', (req, res, next) => {
    res.render('home');
});


router.post("/api/search", (req, res, next) => {


    console.log(req.body.queries);
    const query = req.body.queries;
    const words = req.body.queries.split(" ");
    let q = `UCInetID:*${query}*~3%20OR%20Name:*${query}*~3%20OR%20Email_Address:*${query}*~3%20OR%20Department_str:*${query}*~3%20OR%20Title:*${query}*~3`;

    words.forEach(word => {
        q += `%20OR%20UCInetID:${word}~.3%20OR%20Name:${word}~.3%20OR%20Email_Address:${word}~.3%20OR%20Department_str:${word}~.3%20OR%20Title:${word}~.3`
    });


    // TODO: prefix fuzzy search

    // TODO: manually configuration support

    // TODO: possible for weighted index


    let result = [];
    request({
        url: `http://localhost:8983/solr/PSearch/select?fl=UCInetID,%20Name,%20Major,%20Email_Address,%20Department&q=${q}&wt=json`,
        json: true
    })
        .then((resp) => {
            resp.response.docs.forEach((x) => {
                result.push(x);
            });
        }).then(
        () => {

            res.send(result);


        });


})
;

// export object module
module.exports = router;
