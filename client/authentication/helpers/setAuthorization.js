import axios from 'axios';
import jwt from 'jsonwebtoken';


/**
 * sets token in request headers
 * @param {string} token
 * @returns {undefined} - does not return a value
 */
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

/**
 * checks if token if valid
 * @param {string} token
 * @returns {Boolean} - true/false
 */
export const isValidToken = (token) => {
  const expirationTime = jwt.decode(token) === null ? true
    : jwt.decode(token).exp;
  const currentDate = new Date();
  if (expirationTime === true
    || expirationTime < Math.floor(currentDate.getTime() / 1000)) {
    localStorage.removeItem('token');
    return false;
  }
  return true;
};
