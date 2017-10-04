import axios from 'axios';

export default id => dispatch => axios.put(`/api/recipes/${id}/downvotes`);
