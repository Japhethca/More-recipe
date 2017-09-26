'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackConfig = require('../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// library and controller initiazation
_dotenv2.default.config();

var app = (0, _express2.default)();

// secret for json web token
app.set('secret_key', process.env.SECRET_KEY);

// for parsing request body content
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((0, _webpackDevMiddleware2.default)((0, _webpack2.default)(_webpackConfig2.default)));
// more recipe api routes
app.use('/api', _api2.default);

app.get('/*', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname, '../index.html'));
});
app.all('*', function (req, res) {
  res.status(404).send('404: Not Found');
});

// server initialization
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server running. listening on port:  ' + port);
});

exports.default = app;