import { IS_FETCHING } from '../recipes/actionTypes';


const initialState = {
  isFetching: false
};
/**
 * @export
 * @param {boolean} [state=false]
 * @param {object} action
 * @returns {boolean} new state
 */
export default function isLoading(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
}
