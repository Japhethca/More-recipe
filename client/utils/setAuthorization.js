import axios from 'axios';
import jwt from 'jsonwebtoken';


export const isValidToken = (token) => {
  const expirationTime = jwt.decode(token).exp;
  const currentDate = new Date();
  if (expirationTime < Math.floor(currentDate.getTime() / 1000)) {
    localStorage.removeItem('token');
    return false;
  }
  return true;
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
