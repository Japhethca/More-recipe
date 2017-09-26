import axios from 'axios';

export default userdata => dispatch => axios.post('/api/users/signup', userdata);

