import axios from 'axios';
import jwt from 'jsonwebtoken';
import { toastr } from 'react-redux-toastr';
import { isFetching } from '../home/actions';

import { setAuthorizationToken } from './helpers/setAuthorization';
import { SET_CURRENT_USER } from './actionTypes';

/**
 * @export
 * @param {object} user
 * @param {any} errors
 * @returns {object} - action
 */
export const setCurrentUser = (user, errors) => ({
  type: SET_CURRENT_USER,
  user,
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
  const url = requestType === 'login' ? '/api/users/signin' : '/api/users/signup';

  return (dispatch) => {
    dispatch(isFetching(true));
    axios.post(url, userdata)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token), null));
        toastr.success(res.data.message);
        dispatch(isFetching(false));
      })
      .catch((error) => {
        dispatch(isFetching(false));
        toastr.error(error.response.data.message);
        dispatch(setCurrentUser(null, error.response.data.message));
      });
  };
};
