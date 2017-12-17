import axios from 'axios';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

export const isValidToken = (token) => {
  const userToken = jwt.decode(token);
  return userToken;
};
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
