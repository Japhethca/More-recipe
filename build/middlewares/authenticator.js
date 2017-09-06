'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = undefined;

var _app = require('../app');

var authenticate = function authenticate(req, res, next) {
  var token = req.body.token || req.query.token || req.headers.token;

  if (req.url === '/users/signin' || req.url === '/users/signup') {
    next();
  } else if (token) {
    _app.jwt.verify(token, _app.app.get('secret_key'), function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed!' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.status(403).json({ message: 'failed! No token.' });
  }
};

exports.authenticate = authenticate;