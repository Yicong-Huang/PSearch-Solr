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
    const words = req.body.queries.split(",");


    let result = [];
    request({
        url: `http://localhost:8983/solr/PSearch/select?fl=UCInetID,%20Name,%20Major,%20Email_Address,%20Department_str&q=UCInetID:${query}~3%20OR%20Name:${query}~3%20OR%20Email_Address:${query}~3%20OR%20Department_str:${query}~3%20OR%20Title:${query}~3&wt=json`,
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
