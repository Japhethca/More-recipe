import lodash from 'lodash';

import {
  SET_CURRENT_USER,
  SIGNUP_FAILED_ERRORS,
  LOGIN_FAILED_ERRORS } from './actionTypes';


const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: {},
  loginErrors: '',
  signupErrors: ''
};

/**
 * @export
 * @param {object} [state=initiaState]
 * @param {object} action
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !lodash.isEmpty(action.user),
        user: action.user,
      };
    case SIGNUP_FAILED_ERRORS:
      return {
        ...state,
        signupErrors: action.errors
      };
    case LOGIN_FAILED_ERRORS:
      return {
        ...state,
        loginErrors: action.errors
      };
    default:
      return state;
  }
};
