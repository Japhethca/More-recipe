'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _v = require('./v1');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { authenticate } from '../middlewares/authenticator';

var apiRouter = _express2.default.Router();

// apiRouter.use(authenticate);
apiRouter.use(_v.apiV1);
apiRouter.use('/v1', _v.apiV1);

exports.apiRouter = apiRouter;