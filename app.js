var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.status(404).json({name: 'API', version: '1.0', status: 404, message: 'not_found'});
});

module.exports = app;
