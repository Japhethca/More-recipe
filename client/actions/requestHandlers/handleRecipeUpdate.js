import axios from 'axios';

export default data => dispatch => axios.put(`/api/recipes/${data.id}`, data);
