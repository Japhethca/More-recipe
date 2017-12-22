import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import jwt from 'jsonwebtoken';


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
 * @param {object} userdata
 * @returns {promise} axios response promise
 */
export default function (userdata) {
  return dispatch => axios.post('/api/users/signup', userdata)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token), null));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
      dispatch(setCurrentUser(null, error.response.data.message));
    });
}
