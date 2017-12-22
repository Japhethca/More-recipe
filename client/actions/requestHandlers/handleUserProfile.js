import axios from 'axios';
import { toastr } from 'react-redux-toastr';


import upload from './handleFileUpload';
import { EDIT_USER_PROFILE, GET_USER_PROFILE } from '../types';
import isloading from './isLoading';
/**
 * @param {object} profile
 * @returns {object} redux action
 */
function getUserProfile(profile) {
  return {
    type: GET_USER_PROFILE,
    profile
  };
}
/**
 * @export
 * @returns {promise} axios promise
 */
export function handleGetUserProfile() {
  return dispatch => axios.get('/api/users/profile').then(res => dispatch(getUserProfile(res.data)));
}
/**
 * @param {object} newProfile - user object
 * @returns {object} redux action
 */
function editUserProfile(newProfile) {
  return {
    type: EDIT_USER_PROFILE,
    newProfile
  };
}
/**
 * @export
 * @param {any} data - user object
 * @returns {promise} axios or supseragent
 */
export function handleEditUserProfile(data) {
  return (dispatch) => {
    if (typeof (data.photo) === 'object') {
      dispatch(isloading(true));
      upload(data.photo).end((err, res) => {
        if (!err) {
          data.photo = res.body.url;
          axios.put('/api/users/profile', data)
            .then((response) => {
              dispatch(editUserProfile(response.data.userData));
              toastr.success(response.data.message);
              dispatch(isloading(false));
            })
            .catch(error => toastr.error(error.response.data.message));
        } else {
          toastr.error('Failed to load image');
        }
      });
    } else {
      dispatch(isloading(true));
      axios.put('/api/users/profile', data)
        .then((response) => {
          dispatch(editUserProfile(response.data.userData));
          toastr.success(response.data.message);
          dispatch(isloading(false));
        })
        .catch(error => toastr.error(error.response.data.message));
    }
  };
}

