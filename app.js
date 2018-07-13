// import express.js framework and other needed dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let app = express();


// register middleware with web application
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.raw());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// register routes handling
const routes = require('./routes/index');
app.use('/', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
