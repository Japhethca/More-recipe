'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwt = exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = require('./route/api');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// library and controller initiazation
var app = (0, _express2.default)();

//secret for json web token
app.set('secret_key', process.env.SECRET_KEY);
//for parsing body content
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

//routes
app.use('/api', /* isLoggedIn, */_api.apiRouter);
app.all('*', function (req, res) {
  res.status(404).send("404: Not Found");
});

// server initialization
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server running. listening on port: " + port);
});

exports.app = app;
exports.jwt = _jsonwebtoken2.default;