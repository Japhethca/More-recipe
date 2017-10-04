import axios from 'axios';

export default data => dispatch => axios.post('/api/recipes', data);

