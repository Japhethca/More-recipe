import axios from 'axios';
import upload from './handleFileUpload';
import { UPDATE_RECIPE } from '../types';


function updateRecipe(data) {
  return {
    type: UPDATE_RECIPE,
    recipe: data
  };
}
/**
 * action for  updating recipe
 * @author chidex
 * @argument object
 * @function
 * it gets the filds from the form filled before submitting
 */
export default data => (dispatch) => {
  if (typeof (data.image) === 'object') {
    upload(data.image).end((err, res) => {
      if (!err || res) {
        data.image = res.body.url;
        Materialize.toast('Recipe Successfully Updated!', 4000);
        axios.put(`/api/recipes/${data.id}`, data).then((res) => {
          dispatch(updateRecipe(res.data.updated));
        }).catch(err => Materialize.toast('Recipe Update Failed!', 4000));
      } else {
        Materialize.toast('Failed to load image!', 4000);
      }
    });
  } else {
    axios.put(`/api/recipes/${data.id}`, data).then((res) => {
      dispatch(updateRecipe(res.data.updated));
    }).catch(err => Materialize.toast('Recipe Update Failed!', 4000));
  }
};

