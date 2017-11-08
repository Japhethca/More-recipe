import axios from 'axios';
import upload from './handleFileUpload';
import { ADD_NEW_RECIPE } from '../types';


function addNewRecipe(recipe) {
  return {
    type: ADD_NEW_RECIPE,
    recipe
  };
}

export default data => (dispatch) => {
  if (typeof (data.image) === 'object') {
    upload(data.image).end((err, res) => {
      if (!err || res.ok) {
        data.image = res.body.url;
        Materialize.toast('Recipe Successfully Created!', 4000);
        axios.post('/api/recipes', data).then((res) => {
          dispatch(addNewRecipe(res.data.Details));
        }).catch(err => Materialize.toast('Recipe was not created!', 4000));
      } else {
        Materialize.toast('Unable to load image', 4000);
      }
    });
  } else {
    axios.post('/api/recipes', data).then((res) => {
      dispatch(addNewRecipe(res.data.Details));
      Materialize.toast('Recipe Successfully Created!', 4000);
    }).catch(err => Materialize.toast('Recipe was not created!', 4000));
  }
};
