import axios from 'axios';

export default () => dispatch => axios.get('/api/users/recipes');
