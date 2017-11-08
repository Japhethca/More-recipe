import axios from 'axios';
import upload from './handleFileUpload';
import { EDIT_USER_PROFILE, GET_USER_PROFILE } from '../types';

const cloudinary_url = 'https://api.cloudinary.com/v1_1/dcmxbxzyj/image/upload';
const cloudinary_preset = 'peejyira';
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
      upload(data.photo).end((err, res) => {
        if (!err || res.ok) {
          data.photo = res.body.url;
          axios.post('/api/users/profile', data).then((res) => {
            dispatch(editUserProfile(res.data.profile));
            Materialize.toast('Profile Successfully updated!', 4000);
          }).catch(err => Materialize.toast('Update Unsuccessful!', 4000));
        } else {
          Materialize.toast('Unable to load image', 4000);
        }
      });
    } else {
      axios.post('/api/users/profile', data).then((res) => {
        dispatch(editUserProfile(res.data.profile));
        Materialize.toast('Profile Successfully updated!', 4000);
      }).catch(err => Materialize.toast('Update Unsuccessful!', 4000));
    }
  };
}

