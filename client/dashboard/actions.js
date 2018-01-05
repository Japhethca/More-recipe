import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { getRecipeCount } from '../home/actions';
import upload from '../utilities/fileUpload';
import { EDIT_USER_PROFILE, GET_USER_PROFILE, } from './actionTypes';
import { GET_USER_RECIPES, GET_USER_FAVORITES } from '../recipes/actionTypes';


/**
 * @description creates a user profile action
 * @param {object} profile
 * @returns {object} redux action
 */
const getUserProfile = profile => ({
  type: GET_USER_PROFILE,
  profile
});

/**
 * @description handle submiting user profile
 * @export
 * @returns {promise} axios promise
 */
export const handleGetUserProfile = () => dispatch => axios.get('/api/users/profile')
  .then(res => dispatch(getUserProfile(res.data))).catch(error => console.log(error.response));


/**
 * @description edit user profile action creators
 * @param {object} newProfile - user object
 * @returns {object} redux action
 */
const editProfileAction = newProfile => ({
  type: EDIT_USER_PROFILE,
  newProfile
});

/**
 * @description make an apit for to get users profile
 * @export
 * @param {Object} data - user object
 * @returns {promise} axios or supseragent
 */
export const handleEditUserProfile = data => (dispatch) => {
  if (typeof (data.photo) === 'object') {
    upload(data.photo).end((err, res) => {
      if (!err) {
        data.photo = res.body.url;
        axios.put('/api/users/profile', data)
          .then((response) => {
            dispatch(editProfileAction(response.data.userData));
            toastr.success(response.data.message);
          })
          .catch(error => toastr.error(error.response.data.message));
      } else {
        toastr.error('Failed to load image');
      }
    });
  } else {
    axios.put('/api/users/profile', data)
      .then((response) => {
        dispatch(editProfileAction(response.data.userData));
        toastr.success(response.data.message);
      })
      .catch(error => toastr.error(error.response.data.message));
  }
};

/**
 * @description creates user recipes action
 * @param {array} userRecipes
 * @returns {Object} action
 */
function userRecipesAction(userRecipes) {
  return {
    type: GET_USER_RECIPES,
    userRecipes
  };
}

/**
 * @export
 * @argument {Number} page
 * @argument {Number} limit
 * @returns {promise} axios promise
 */
export const handleGetUserRecipes = (page = 1, limit = 4) => dispatch => axios.get(`/api/users/recipes?limit=${limit}&page=${page}`)
  .then((res) => {
    const numPages = Math.ceil(res.data.count / limit);
    dispatch(getRecipeCount(numPages, page));
    dispatch(userRecipesAction(res.data.recipes));
  }).catch(error => error);


/**
 * @description creates an action for getting all favorite recipes
 * @param {array} favorites
 * @returns {object} sction
 */
function getFavoritesAction(favorites) {
  return {
    type: GET_USER_FAVORITES,
    favorites
  };
}

/**
 * @description an action for getting users favorite recipes
 * @export
 * @param {Number} page
 * @param {Number} limit
 * @returns {promise} axios promise
 */
export const handleGetFavorites = (page = 1, limit = 4) => dispatch => axios.get(`/api/users/favorites?limit=${limit}&page=${page}`)
  .then((res) => {
    const favorites = res.data.favorites.map(favorite => favorite.Recipe);
    const numPages = Math.ceil(res.data.count / limit);
    dispatch(getRecipeCount(numPages, page));
    dispatch(getFavoritesAction(favorites));
  }).catch(error => error);
