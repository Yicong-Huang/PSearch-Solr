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
    let result = [];
    request({
        url: 'http://localhost:8983/solr/PSearch/select?q=UCInetID:' + req.body.queries + '~0.3&wt=json',
        json: true
    })
        .then((resp) => {
            resp.response.docs.forEach((x) => {
                result.push(x);
            });
        }).then(
        () => {
            request({
                url: 'http://localhost:8983/solr/PSearch/select?q=Name:' + req.body.queries + '~0.3&wt=json',
                json: true
            })
                .then((resp) => {
                    resp.response.docs.forEach((x) => {
                        result.push(x);
                    });
                }).then(() => {
                res.send(result);
            });


        });


})
;

// export object module
module.exports = router;
