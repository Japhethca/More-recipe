'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _v = require('./v1');

var _v2 = _interopRequireDefault(_v);

var _authenticator = require('../middlewares/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRouter = _express2.default.Router();

apiRouter.use(_authenticator2.default.authenticate);
apiRouter.use(_v2.default);
apiRouter.use('/v1', _v2.default);

exports.default = apiRouter;