import { EDIT_USER_PROFILE, GET_USER_PROFILE } from './actionTypes';

/**
 * @export
 * @param {object} [state={}]
 * @param {object} action
 * @returns {object} new state
 */
export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...action.profile };
    case EDIT_USER_PROFILE:
      return { ...state, ...action.newProfile };
    default:
      return state;
  }
};
