import axios from 'axios';
import jwt from 'jsonwebtoken';
import { toastr } from 'react-redux-toastr';
import { isFetching } from '../Recipes/actions';

import { setAuthorizationToken } from './helpers/setAuthorization';
import {
  SET_CURRENT_USER,
  LOGIN_FAILED_ERRORS,
  SIGNUP_FAILED_ERRORS } from './actionTypes';

/**
 * @export
 * @param {object} user
 * @returns {object} - action
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * @export
 * @param {string} errors
 * @returns {object} - action
 */
export const loginFailed = errors => ({
  type: LOGIN_FAILED_ERRORS,
  errors
});

/**
 * @export
 * @param {any} errors
 * @returns {object} - action
 */
export const signupFailed = errors => ({
  type: SIGNUP_FAILED_ERRORS,
  errors
});

/**
 * @export
 * @returns {object} - dispatch
 */
export const handleLogout = () => (dispatch) => {
  localStorage.clear();
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
  dispatch({ type: 'RESET' });
};

/**
 * @export
 * @param {object} userdata
 * @param {string} requestType
 * @returns {promise} axios response promise
 */
export const handleAuthRequest = (userdata, requestType) => {
  const url = requestType === 'login' ?
    '/api/users/signin' : '/api/users/signup';

  return (dispatch) => {
    dispatch(isFetching(true));
    return axios.post(url, userdata)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        toastr.success(response.data.message);
        dispatch(isFetching(false));
      })
      .catch((error) => {
        dispatch(isFetching(false));
        toastr.error(error.response.data.message);
        if (requestType === 'login') {
          dispatch(loginFailed(error.response.data.message));
        } else {
          dispatch(signupFailed(error.response.data.message));
        }
      });
  };
};
