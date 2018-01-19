import Validator from 'validatorjs';
import _ from 'lodash';


const signinRules = {
  email: 'required|email',
  password: 'required|min:5',
};

const signupRules = {
  username: 'required|string|min:3',
  email: 'required|email',
  password: 'required|min:5',
  verifyPassword: 'required|min:5',
};

const reviewRules = {
  content: 'required'
};

const recipeFormRules = {
  name: 'required',
  ingredients: 'required',
  description: 'required',
  direction: 'required'
};

/**
 * @description handles user input validation
 * @param {Object} request
 * @param {Object} response
 * @param {function} next
 * @param {Object} rules - validation rules
 * @returns {function} - function
 */
const validate = (request, response, next, rules) => {
  const validator = new Validator(request.body, rules);
  if (validator.passes()) {
    return next();
  }
  const errors = Object.values(validator.errors.errors).map(val => val[0]);
  return response.status(400).json({
    status: 'failed',
    message: errors
  });
};

export const signupValidator = (
  request,
  response,
  next
) => validate(request, response, next, signupRules);

export const signinValidator = (
  request,
  response,
  next
) => validate(request, response, next, signinRules);

export const reviewPostValidator = (
  request,
  response,
  next
) => validate(request, response, next, reviewRules);

export const recipeValidator = (
  request,
  response,
  next
) => validate(request, response, next, recipeFormRules);

/**
 * @description checks for valid request query
 * @param {String} query - request query
 * @param {Array} validQuery - a list of valid queries
 * @returns {Boolean} - true or false
 */

export const checkQuery = (query, validQuery) => {
  for (let index = 0; index < validQuery.length; index += 1) {
    if (validQuery[index] === query) {
      return true;
    }
  }
  return false;
};

/**
 * @description checks for valid request parameters
 * @param {Object} request - request query
 * @param {Object} response - request query
 * @param {function} next - request query
 * @returns {Boolean} - true or false
 */
export const checkParams = (request, response, next) => {
  if (request.params) {
    const param = Object.keys(request.params)[0];
    if (_.isNaN(parseInt(request.params[param], 10))) {
      return response.status(400).json({
        status: 'failed',
        message: 'Invalid URL parameter type, parameter must be a number'
      });
    }
  }
  next();
};
