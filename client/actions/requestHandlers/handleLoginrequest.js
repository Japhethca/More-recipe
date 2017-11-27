import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../utils/setAuthorization';
import { SET_CURRENT_USER } from '../types';


export function setCurrentUser(user, errors) {
  return {
    type: SET_CURRENT_USER,
    user,
    errors
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch({ type: 'RESET' });
  };
}
export function handleLoginRequest(userdata) {
  return dispatch => axios.post('/api/users/signin', userdata).then((res) => {
    const token = res.data.Token;
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token), null));
  }).catch((error) => {
    dispatch(setCurrentUser(null, error.response.data.message));
  });
}
