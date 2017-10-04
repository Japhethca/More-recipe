import { ADD_FLASH_MESSAGE } from './types';

function flashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
export function addFlashMessage(message) {
  return dispatch =>
    dispatch(flashMessage(message));
}
