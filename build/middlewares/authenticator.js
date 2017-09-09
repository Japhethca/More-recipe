'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = {
  authenticate: function authenticate(req, res, next) {
    var token = req.body.token || req.query.token || req.headers.token;

    if (req.url === '/users/signin' || req.url === '/users/signup') {
      next();
    } else if (token) {
      _jsonwebtoken2.default.verify(token, _app2.default.get('secret_key'), function (err, decoded) {
        if (err) {
          return res.status(401).json({ message: 'Authentication failed!' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      res.status(403).json({ message: 'failed! No token. Sign in to get one.' });
    }
  },


  // contoller to handle unimplemented methods
  notImplemented: function notImplemented(req, res) {
    res.status(405).json({ message: 'Method not supported!' });
  }
};

exports.default = auth;