import axios from 'axios';

export default id => dispatch => axios.get(`/api/admin/user/${id}`);
