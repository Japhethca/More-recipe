import {
  GET_SINGLE_RECIPE,
  ADD_NEW_REVIEW,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE } from '../actions/types';


const initialState = {
  name: '',
  description: '',
  id: 0,
  ingredients: '',
  direction: '',
  image: null,
  upvotes: 0,
  views: 0,
  downvotes: 0,
  userId: 0,
  createdAt: '',
  updatedAt: '',
  author: {
    username: '',
    photo: null
  },
  Reviews: []
};

let newState;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_RECIPE:
      return { ...action.recipe };

    case ADD_NEW_REVIEW:
      newState = { ...state };
      newState.Reviews = [...newState.Reviews, action.review];
      return newState;

    case UPVOTE_RECIPE:
      return { ...state, ...action.recipe };

    case DOWNVOTE_RECIPE:
      return { ...state, ...action.recipe };

    default:
      return state;
  }
};
