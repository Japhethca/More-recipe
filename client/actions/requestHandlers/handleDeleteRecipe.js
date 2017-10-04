import axios from 'axios';

export default id => dispatch => axios.delete(`/api/recipes/${id}`);

