import axios from 'axios';
import { toastr } from 'react-redux-toastr';


import upload from '../utilities/fileUpload';
import { EDIT_USER_PROFILE, GET_USER_PROFILE, } from './actionTypes';
import { GET_USER_RECIPES, GET_USER_FAVORITES } from '../recipes/actionTypes';


/**
 * @description creates a user profile action
 * @param {object} profile
 * @param {object} isFetching
 * @returns {object} redux action
 */
const getUserProfile = (profile, isFetching = false) => ({
  type: GET_USER_PROFILE,
  profile,
  isFetching
});

/**
 * @description handle submiting user profile
 * @export
 * @returns {promise} axios promise
 */
export const handleGetUserProfile = () => (dispatch) => {
  dispatch(getUserProfile({}, true));
  axios.get('/api/users/profile')
    .then((res) => {
      dispatch(getUserProfile(res.data));
    }).catch(() => {
      dispatch(getUserProfile({}));
    });
};


/**
 * @description edit user profile action creators
 * @param {object} newProfile - user object
 * @param {object} newProfile - user object
 * @param {Boolean} isFetching - user object
 * @returns {object} redux action
 */

const editProfileAction = (newProfile, isFetching = false) => ({
  type: EDIT_USER_PROFILE,
  newProfile,
  isFetching
});

/**
 * @description make an apit for to get users profile
 * @export
 * @param {Object} data - user object
 * @returns {promise} axios or supseragent
 */
export const handleEditUserProfile = data => (dispatch) => {
  const makeRequest = profileData => axios.put('/api/users/profile', profileData)
    .then((res) => {
      dispatch(editProfileAction(res.data.userData));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      if (error.response.data) {
        toastr.error(error.response.data.message);
        dispatch(editProfileAction({}));
      }
    });

  dispatch(editProfileAction({}, true));
  if (typeof (data.photo) === 'object') {
    upload(data.photo).end((err, res) => {
      if (!err) {
        data.photo = res.body.url;
        makeRequest(data);
      } else {
        toastr.error('Failed to load image');
        dispatch(editProfileAction({}));
      }
    });
  } else {
    makeRequest(data);
  }
};

/**
 * @description creates user recipes action
 * @param {array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @param {Boolean} isFetching
 * @returns {Object} action
 */
function userRecipesAction(payload, currentPage, totalPages, isFetching = false) {
  return {
    type: GET_USER_RECIPES,
    payload,
    currentPage,
    totalPages,
    isFetching
  };
}

/**
 * @export
 * @argument {Number} page
 * @argument {Number} limit
 * @returns {promise} axios promise
 */
export const handleGetUserRecipes = (page = 1, limit = 12) => (dispatch) => {
  dispatch(userRecipesAction([], 0, 0, true));
  axios.get(`/api/users/recipes?limit=${limit}&page=${page}`)
    .then((res) => {
      const numPages = Math.ceil(res.data.count / limit);
      dispatch(userRecipesAction(res.data.recipes, page, numPages));
    }).catch((error) => {
      if (error.response.status === 404 && page > 0) {
        dispatch(userRecipesAction([], 0, 0));
      }
    });
};

/**
 * @description creates user recipes action
 * @param {array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @param {Boolean} isFetching
 * @returns {Object} action
 */
function getFavoritesAction(payload, currentPage, totalPages, isFetching = false) {
  return {
    type: GET_USER_FAVORITES,
    payload,
    currentPage,
    totalPages,
    isFetching
  };
}


/**
 * @description an action for getting users favorite recipes
 * @export
 * @param {Number} page
 * @param {Number} limit
 * @returns {promise} axios promise
 */
export const handleGetFavorites = (page = 1, limit = 12) => (dispatch) => {
  dispatch(getFavoritesAction([], 0, 0, true));
  axios.get(`/api/users/favorites?limit=${limit}&page=${page}`)
    .then((res) => {
      const favorites = res.data.favorites.map(favorite => favorite.Recipe);
      const numPages = Math.ceil(res.data.count / limit);
      dispatch(getFavoritesAction(favorites, page, numPages));
    }).catch(() => {
      dispatch(getFavoritesAction([], 0, 0));
    });
};
