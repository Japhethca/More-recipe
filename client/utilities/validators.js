import Validator from 'validatorjs';

const signinRules = {
  email: 'required|email',
  password: 'required'
};

const signupRules = {
  email: 'required|email',
  password: 'required',
  username: 'required|min:2',
  verifyPassword: 'required|min:5|same:password'
};

const recipeFormRules = {
  name: 'required',
  ingredients: 'required',
  direction: 'required',
  description: 'required'
};

const profileRules = {
  firstname: 'required',
  lastname: 'required',
  password: 'required',
  username: 'required'
};

/**
 *
 * @param {object} rules
 * @return {object} - object of boolean and object of errors
 */
const validator = rules => (data) => {
  const validate = new Validator(data, rules);
  const errors = {};
  const isValid = false;
  if (validate.passes()) {
    return {
      isValid: true,
      errors
    };
  }
  return {
    isValid,
    errors: validate.errors.errors
  };
};


export const signinValidator = validator(signinRules);
export const signUpValidator = validator(signupRules);
export const recipeFormValidator = validator(recipeFormRules);
export const profileUpdateFormValidator = validator(profileRules);

