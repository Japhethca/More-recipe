import { EDIT_USER_PROFILE, GET_USER_PROFILE } from '../actions/types';


export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return action.profile;
    case EDIT_USER_PROFILE:
      return Object.assign({}, state, action.newProfile);
    default:
      return state;
  }
};

