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
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @param {Object} rules - validation rules
 * @returns {function} - function or Respose object
 */
const validate = (req, res, next, rules) => {
  const validator = new Validator(req.body, rules);
  if (validator.passes()) {
    return next();
  }
  const errors = Object.values(validator.errors.errors).map(val => val[0]);
  res.status(400).json({
    status: 'failed',
    message: errors
  });
};

export const signupValidator = (req, res, next) => validate(req, res, next, signupRules);
export const signinValidator = (req, res, next) => validate(req, res, next, signinRules);
export const reviewPostValidator = (req, res, next) => validate(req, res, next, reviewRules);
export const recipeValidator = (req, res, next) => validate(req, res, next, recipeFormRules);

/**
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

export const checkParams = (req, res, next) => {
  if (req.params) {
    const param = Object.keys(req.params)[0];
    if (_.isNaN(parseInt(req.params[param], 10))) {
      res.status(400).json({
        status: 'failure',
        message: 'Invalid URL parameter type, parameter must an Number'
      });
    }
  }
  next();
};
