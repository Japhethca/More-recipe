import axios from 'axios';
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
/* function imageUpload(filedata) {
  const formdata = new FormData(filedata);
  formdata.append('file', filedata);
  formdata.append('form-preset', cloudinary_url);

  axios({
    url: cloudinary_url,
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: formdata
  }).then((res) => { console.log(res); }).catch((err) => { console.log(err); });
} */
export function handleEditUserProfile(data) {
  // console.log(data.photo);
  // const formdata = new FormData();
  // formdata.append('file', data.photo);
  // formdata.append('form-preset', cloudinary_url);

  // axios({
  //   url: cloudinary_url,
  //   method: 'POST',
  //   headers: {
  //     'Content-type': 'application/x-www-form-urlencoded'
  //   },
  //   data: formdata
  // }).then((res) => { console.log(res); }).catch((err) => { console.log(err); });
  return dispatch => axios.post('/api/users/profile', data).then(res => dispatch(editUserProfile(res.data.profile)));
}
