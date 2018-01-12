import expect from 'expect';

import mockStore, { mock } from '../__mock__/configMockStore';
import { ADD_NEW_REVIEW_SUCCESS, ADD_NEW_REVIEW_FAILED } from '../../Recipes/actionTypes';
import reviewAction from '../../Reviews/actions';


describe('REVIEW RECIPE actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('creates ADD_NEW_REVIEW_SUCCESS actions when review has been added to recipe', () => {
    mock.onGet('/api/recipe/1/review')
      .replyOnce(200, {
        review: { content: 'nice one', recipeId: 1, userId: 1 },
      });

    const expectedActions = [
      {
        type: ADD_NEW_REVIEW_SUCCESS,
        review: { content: 'nice one', recipeId: 1, userId: 1 }
      },
    ];
    const store = mockStore({});

    store.dispatch(reviewAction(1)).then(() => {
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

