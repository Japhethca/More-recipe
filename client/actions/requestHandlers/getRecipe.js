import axios from 'axios';

export default id => dispatch => axios.get(`/api/recipes/${id}`);
