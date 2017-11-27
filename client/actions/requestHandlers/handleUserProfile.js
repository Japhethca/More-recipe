import axios from 'axios';
import upload from './handleFileUpload';
import { EDIT_USER_PROFILE, GET_USER_PROFILE } from '../types';
import isloading from './isLoading';
 
function getUserProfile(profile) {
  return {
    type: GET_USER_PROFILE,
    profile
  };
}
export function handleGetUserProfile() {
  return dispatch => axios.get('/api/users/profile').then(res => dispatch(getUserProfile(res.data)));
}

function editUserProfile(newProfile) {
  return {
    type: EDIT_USER_PROFILE,
    newProfile
  };
}

export function handleEditUserProfile(data) {
  return (dispatch) => {
    if (typeof (data.photo) === 'object') {
      dispatch(isloading(true));
      upload(data.photo).end((err, res) => {
        if (!err) {
          data.photo = res.body.url;
          axios.post('/api/users/profile', data).then((res) => {
            dispatch(editUserProfile(res.data.profile));
            Materialize.toast('Profile Successfully updated!', 4000);
            dispatch(isloading(false));
          }).catch(err => Materialize.toast('Update Unsuccessful!', 4000));
        } else {
          Materialize.toast('Unable to load image', 4000);
        }
      });
    } else {
      dispatch(isloading(true));
      axios.post('/api/users/profile', data).then((res) => {
        dispatch(editUserProfile(res.data.profile));
        Materialize.toast('Profile Successfully updated!', 4000);
        dispatch(isloading(false));
      }).catch(err => Materialize.toast('Update Unsuccessful!', 4000));
    }
  };
}

