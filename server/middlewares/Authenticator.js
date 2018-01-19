import jwt from 'jsonwebtoken';

import app from '../app';


const Authenticator = {
  /**
   * @description handles user authentiaction
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   * @param {function} next
   * @returns {none} does not return return a value
   */
  authenticate(request, response, next) {
    const token = request.body.token
      || request.query.token
      || request.headers.token;

    if (request.url === '/users/signin'
      || request.url === '/users/signup'
      || request.url === '/v1/users/signin'
      || request.url === '/v1/users/signup') {
      next();
    } else if (token) {
      jwt.verify(token, app.get('secret_key'), (err, decoded) => {
        if (err) {
          return response.status(401).json({
            status: 'failed',
            message: 'Authentication failed: expired/invalid token'
          });
        }
        request.decoded = decoded;
        next();
      });
    } else {
      response.status(403).json({
        status: 'failed',
        message: 'failed! No token. Sign in to get one.'
      });
    }
  },

  /**
   * @description handle non inplemented request methods
   * @param {Object} request - HTTP request
   * @param {Object} response - HTTP response
   * @returns {Object} - Response
   */
  notImplemented(request, response) {
    return response.status(405).json({
      status: 'failed',
      message: 'Unsupported Request Method'
    });
  },
};

export default Authenticator;
