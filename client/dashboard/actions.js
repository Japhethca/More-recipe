import axios from 'axios';
import { toastr } from 'react-redux-toastr';


import upload from '../utilities/fileUpload';
import { EDIT_USER_PROFILE, EDIT_USER_PROFILE_FAILED,
  EDIT_USER_PROFILE_START, GET_USER_PROFILE,
  GET_USER_PROFILE_FAILED, GET_USER_PROFILE_START } from './actionTypes';
import * as types from '../Recipes/actionTypes';


/**
 * @description dispatch on fetching user favorites success
 * @param {object} profile
 * @param {object} isFetching
 * @returns {object} redux action
 */
const getUserProfile = profile => ({
  type: GET_USER_PROFILE,
  profile,
});

/**
 * @description dispatch on fetching user profile start
 * @param {object} profile
 * @param {object} isFetching
 * @returns {object} redux action
 */
const getUserProfileStart = () => ({
  type: GET_USER_PROFILE_START,
});

/**
 * @description dispatch when getting user profile fails
 * @returns {object} redux action
 */
const getUserProfileFailed = () => ({
  type: GET_USER_PROFILE_FAILED,
});

/**
 * @description handle submiting user profile
 * @export
 * @returns {promise} axios promise
 */
export const handleGetUserProfile = () => (dispatch) => {
  dispatch(getUserProfileStart());
  axios.get('/api/users/profile')
    .then((res) => {
      dispatch(getUserProfile(res.data));
    }).catch(() => {
      dispatch(getUserProfileFailed());
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
 * @description edit user profile action creators
 * @param {object} newProfile - user object
 * @param {object} newProfile - user object
 * @param {Boolean} isFetching - user object
 * @returns {object} redux action
 */

const editProfileStartAction = (newProfile, isFetching = false) => ({
  type: EDIT_USER_PROFILE_START,
  newProfile,
  isFetching
});

/**
 * @description edit user profile action creators
 * @param {object} newProfile - user object
 * @param {object} newProfile - user object
 * @param {Boolean} isFetching - user object
 * @returns {object} redux action
 */

const editProfileFailedAction = (newProfile, isFetching = false) => ({
  type: EDIT_USER_PROFILE_FAILED,
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
        dispatch(editProfileFailedAction());
      }
    });

  dispatch(editProfileStartAction());
  if (typeof (data.photo) === 'object') {
    upload(data.photo).end((err, res) => {
      if (!err) {
        data.photo = res.body.url;
        makeRequest(data);
      } else {
        toastr.error('Failed to load image');
        dispatch(editProfileFailedAction());
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
 * @returns {Object} action
 */
const fetchUserRecipesStartAction = () => ({
  type: types.FETCH_USER_RECIPES_START,
});
/**
 * @description creates user recipes action
 * @param {array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @returns {Object} action
 */
const fetchUserRecipesFailedAction = () => ({
  type: types.FETCH_USER_RECIPES_FAILED,
});

/**
 * @description creates user recipes action
 * @param {array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @returns {Object} action
 */
const userRecipesAction = (payload, currentPage, totalPages) => ({
  type: types.FETCH_USER_RECIPES_SUCCESS,
  payload,
  currentPage,
  totalPages,
});

/**
 * @export
 * @argument {Number} page
 * @argument {Number} limit
 * @returns {promise} axios promise
 */
export const handleGetUserRecipes = (page = 1, limit = 12) => (dispatch) => {
  dispatch(fetchUserRecipesStartAction());
  axios.get(`/api/users/recipes?limit=${limit}&page=${page}`)
    .then((res) => {
      const numPages = Math.ceil(res.data.count / limit);
      dispatch(userRecipesAction(res.data.recipes, page, numPages));
    }).catch((error) => {
      if (error.response.status === 404 && page > 0) {
        dispatch(fetchUserRecipesFailedAction());
      }
    });
};

/**
 * @description dispatched on user favorites fetch success
 * @param {array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @returns {Object} action
 */
function getFavoritesAction(payload, currentPage, totalPages) {
  return {
    type: types.FETCH_USER_FAVORITES_SUCCESS,
    payload,
    currentPage,
    totalPages,
  };
}

/**
 * @description dispatched when request starts
 * @returns {Object} action
 */
function getFavoritesStartAction() {
  return {
    type: types.FETCH_USER_FAVORITES_START,
  };
}

/**
 * @description dispatched when fetch favorites request fails
 * @returns {Object} action
 */
function getFavoritesFailedAction() {
  return {
    type: types.FETCH_USER_FAVORITES_FAILED,
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
  dispatch(getFavoritesStartAction());
  axios.get(`/api/users/favorites?limit=${limit}&page=${page}`)
    .then((res) => {
      const favorites = res.data.favorites.map(favorite => favorite.Recipe);
      const numPages = Math.ceil(res.data.count / limit);
      dispatch(getFavoritesAction(favorites, page, numPages));
    }).catch(() => {
      dispatch(getFavoritesFailedAction());
    });
};
