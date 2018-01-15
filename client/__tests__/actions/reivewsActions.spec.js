import expect from 'expect';

import mockStore, { mock } from '../__mock__/configMockStore';
import { ADD_NEW_REVIEW_SUCCESS, ADD_NEW_REVIEW_FAILED } from '../../Recipes/actionTypes';
import reviewAction, { addNewReviewSuccess, addNewReviewFailed } from '../../Reviews/actions';


describe('REVIEW RECIPE actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('creates ADD_NEW_REVIEW_SUCCESS actions when review has been added to recipe', () => {
    const reviewData = { content: 'nice one', recipeId: 1, userId: 1 };
    mock.onGet('/api/recipe/1/review', reviewData)
      .replyOnce(200, {
        response: {
          review: reviewData,
          message: 'review created'
        }
      });

    const expectedActions = [
      {
        type: ADD_NEW_REVIEW_SUCCESS,
        review: reviewData
      },
    ];
    const store = mockStore({});

    store.dispatch(reviewAction(1, reviewData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_NEW_REVIEW_FAILED actions when adding review to recipe fails', () => {
    mock.onGet('/api/recipe/1/review')
      .replyOnce(400);

    const expectedActions = [
      {
        type: ADD_NEW_REVIEW_FAILED
      },
    ];
    const store = mockStore({});

    store.dispatch(reviewAction(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('REVIEW ACTION CREATORS', () => {
  it('should return  ADD_NEW_REVIEW_SUCCESS ', () => {
    const expectedActions = review => (
      {
        type: ADD_NEW_REVIEW_SUCCESS,
        review
      });
    expect(addNewReviewSuccess('nice')).toEqual(expectedActions('nice'));
  });

  it('should return  ADD_NEW_REVIEW_FAILED ', () => {
    const expectedActions = () => (
      {
        type: ADD_NEW_REVIEW_FAILED,
      });
    expect(addNewReviewFailed().type).toEqual(expectedActions().type);
  });
});
