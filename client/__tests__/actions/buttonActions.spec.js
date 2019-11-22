import expect from 'expect';
import axios from 'axios';

import mockStore, { mock } from '../__mock__/configMockStore';
import * as types from '../../Recipes/actionTypes';
import mockData from '../__mock__/mockData';
import * as actions from '../../ActionButtons/actions';
import { handleAddToFavorites,
  handleRemoveFromFavorites } from '../../Recipes/actions';

describe('ACTIONBUTTONS', () => {
  describe('DOWNVOTE actions', () => {
    it(
      'should create DOWNVOTE_RECIPE action type when recipe is downvoted',
      () => {
        mock.onGet('/api/recipe/1/downvote')
          .replyOnce(200, {
            recipe: mockData.recipe,
            message: 'recipe downvoted'
          });

        const expectedActions = [
          {
            type: types.DOWNVOTE_RECIPE,
            recipe: mockData.recipe
          },
        ];
        const store = mockStore({});

        store.dispatch(actions.handleDownvote(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      }
    );
    it('should match upvote action creator', () => {
      const expected = recipe => ({
        type: types.UPVOTE_RECIPE,
        recipe
      });
      expect(actions.upvoteAction(mockData.recipe))
        .toEqual(expected(mockData.recipe));
    });
  });

  describe('UPVOTE actions', () => {
    it(
      'should create UPVOTE_RECIPE action type when recipe is upvoted',
      () => {
        mock.onGet('/api/recipe/1/upvote')
          .replyOnce(200, {
            message: 'recipe upvoted',
            recipe: mockData.recipe,
          });

        const expectedActions = [
          {
            type: types.UPVOTE_RECIPE,
            recipe: mockData.recipe
          },
        ];
        const store = mockStore({});

        store.dispatch(actions.handleUpvote(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      }
    );

    it('should match downvote action creator', () => {
      const expected = recipe => ({
        type: types.DOWNVOTE_RECIPE,
        recipe
      });
      expect(actions.downvoteAction(mockData.recipe))
        .toEqual(expected(mockData.recipe));
    });
  });

  describe('FAVORITE actions', () => {
    it('should create ADD_TO_FAVORITES action type when ' +
    'recipe is added to favorites', () => {
      mock.onGet('/api/users/favorites/1')
        .replyOnce(200, {
          recipe: mockData.recipe,
          status: 'success',
          message: 'recipe successfully added to favorites'
        });

      const expectedActions = [
        {
          type: types.ADD_TO_FAVORITES,
          recipe: mockData.recipe
        },
      ];
      const store = mockStore({});

      store.dispatch(handleAddToFavorites(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should create REMOVE_FROM_FAVORITES_FAILED action type when ' +
    'removing recipe from favorites fails', () => {
      mock.onDelete('/api/users/favorites/1')
        .replyOnce(400, { message: '' });

      const expectedActions = [
        {
          type: types.REMOVE_FROM_FAVORITES_FAILED,
        },
      ];
      const store = mockStore({});

      store.dispatch(handleRemoveFromFavorites(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
