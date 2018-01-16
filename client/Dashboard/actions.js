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
export const getUserProfile = profile => ({
  type: GET_USER_PROFILE,
  profile,
});

/**
 * @description dispatch on fetching user profile start
 * @param {object} profile
 * @param {object} isFetching
 * @returns {object} redux action
 */
export const getUserProfileStart = () => ({
  type: GET_USER_PROFILE_START,
});

/**
 * @description dispatch when getting user profile fails
 * @returns {object} redux action
 */
export const getUserProfileFailed = () => ({
  type: GET_USER_PROFILE_FAILED,
});

/**
 * @description handle submiting user profile
 * @export
 * @returns {promise} axios promise
 */
export const handleGetUserProfile = () => (dispatch) => {
  dispatch(getUserProfileStart());
  return axios.get('/api/users/profile')
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

export const editProfileAction = (newProfile, isFetching = false) => ({
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

export const editProfileStartAction = (newProfile, isFetching = false) => ({
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

export const editProfileFailedAction = (newProfile, isFetching = false) => ({
  type: EDIT_USER_PROFILE_FAILED,
  newProfile,
  isFetching
});

/**
 * @description make an api request for to get users profile
 * @export
 * @param {Object} profileData - user object
 * @returns {promise} axios or supseragent
 */
export const handleEditUserProfile = profileData => async (dispatch) => {
  dispatch(editProfileStartAction());
  if (typeof (profileData.photo) === 'object') {
    await upload(profileData.photo).then((res) => {
      profileData.photo = res.body.secure_url;
    }).catch(() => {
      dispatch(editProfileFailedAction());
      toastr.error('failed to load image');
    });
  }
  return axios.put('/api/users/profile', profileData).then((response) => {
    dispatch(editProfileAction(response.data.userData));
    toastr.success(response.data.message);
  }).catch((error) => {
    dispatch(editProfileFailedAction());
    toastr.error(error.response.data.message);
  });
};

/**
 * @description dispatch on start of api call
 * @returns {Object} action
 */
export const fetchUserRecipesStartAction = () => ({
  type: types.FETCH_USER_RECIPES_START,
});

/**
 * @description dispatched when fetching user recipes fails
 * @returns {Object} action
 */
export const fetchUserRecipesFailedAction = () => ({
  type: types.FETCH_USER_RECIPES_FAILED,
});

/**
 * @description dispatch when fetching user recipes is successful
 * @param {array} payload
 * @returns {Object} action
 */
export const userRecipesAction = payload => ({
  type: types.FETCH_USER_RECIPES_SUCCESS,
  payload,
});

/**
 * @export
 * @argument {Number} page
 * @argument {Number} limit
 * @returns {promise} axios promise
 */
export const handleGetUserRecipes = () => (dispatch) => {
  dispatch(fetchUserRecipesStartAction());
  return axios.get('/api/users/recipes')
    .then((res) => {
      dispatch(userRecipesAction(res.data.recipes));
    }).catch(() => {
      dispatch(fetchUserRecipesFailedAction());
    });
};

/**
 * @description dispatched on user favorites fetch success
 * @param {array} payload
 * @returns {Object} action
 */
export const getFavoritesAction = payload => ({
  type: types.FETCH_USER_FAVORITES_SUCCESS,
  payload,
});

/**
 * @description dispatched when request starts
 * @returns {Object} action
 */
export const getFavoritesStartAction = () => ({
  type: types.FETCH_USER_FAVORITES_START,
});

/**
 * @description dispatched when fetch favorites request fails
 * @returns {Object} action
 */
export const getFavoritesFailedAction = () => ({
  type: types.FETCH_USER_FAVORITES_FAILED,
});

/**
 * @description an action for getting users favorite recipes
 * @export
 * @returns {promise} axios promise
 */
export const handleGetFavorites = () => (dispatch) => {
  dispatch(getFavoritesStartAction());
  return axios.get('/api/users/favorites')
    .then((res) => {
      const favorites = res.data.favorites.map(favorite => favorite.Recipe);
      dispatch(getFavoritesAction(favorites));
    }).catch(() => {
      dispatch(getFavoritesFailedAction());
    });
};
