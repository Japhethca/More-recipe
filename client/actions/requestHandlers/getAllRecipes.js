import axios from 'axios';


export default function () {
  return dispatch => axios.get('/api/recipes');
}
