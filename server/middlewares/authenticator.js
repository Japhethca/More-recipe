import jwt from 'jsonwebtoken';

import app from '../app';


const auth = {
  /**
   * @description handles user authentiaction
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {function} next
   * @returns {none} does not return return a value
   */
  authenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.token;

    if (req.url === '/users/signin' || req.url === '/users/signup') {
      next();
    } else if (token) {
      jwt.verify(token, app.get('secret_key'), (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'failed',
            message: 'Authentication failed: expired token'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      res.status(403).json({
        status: 'failed',
        message: 'failed! No token. Sign in to get one.'
      });
    }
  },

  /**
   * @description handle non inplemented request methods
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @returns {Object} - Response
   */
  notImplemented(req, res) {
    return res.status(405).json({
      status: 'failed',
      message: 'Unsupported Request Method'
    });
  },
};

export default auth;
