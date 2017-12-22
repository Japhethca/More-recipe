import axios from 'axios';
import jwt from 'jsonwebtoken';
import { toastr } from 'react-redux-toastr';

import { setAuthorizationToken } from '../../utils/setAuthorization';
import { SET_CURRENT_USER } from '../types';

/**
 * @export
 * @param {object} user
 * @param {any} errors
 * @returns {object} - action
 */
export function setCurrentUser(user, errors) {
  return {
    type: SET_CURRENT_USER,
    user,
    errors
  };
}
/**
 * @export
 * @returns {object} - dispatch
 */
export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch({ type: 'RESET' });
  };
}
/**
 * @export
 * @param {object} userdata
 * @returns {promise} axios response promise
 */
export function handleLoginRequest(userdata) {
  return dispatch => axios.post('/api/users/signin', userdata)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token), null));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      dispatch(setCurrentUser(null, error.response.data.message));
      toastr.error(error.response.data.message);
    });
}
