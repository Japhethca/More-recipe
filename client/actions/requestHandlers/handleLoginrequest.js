import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../utils/setAuthorization';
import { SET_CURRENT_USER } from '../types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem(localStorage.token);
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
export function handleLoginRequest(userdata) {
  // handles loging request
  return dispatch => axios.post('/api/users/signin', userdata).then((res) => {
    const token = res.data.Token;
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}
