import expect from 'expect';
import mockStore, { mock } from '../__mock__/configMockStore';
import * as types from '../../Recipes/actionTypes';
import { getAllRecipes } from '../../home/actions';
// import { getRecipe, addToFavorites,
//   removeFavorite, handleUpdateRecipe,
//   handleCreateRecipe, handleDeleteRecipe, handleRemoveFavorite } from '../../Recipes/actions';


describe('RECIPES actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('creates FETCH_LATEST_RECIPES_START and FETCH_LATEST_RECIPES_SUCCESS actions when fetching recipes has been done', () => {
    mock.onGet('/api/recipes', { params: { limit: 1, page: 1 } })
      .replyOnce(200, {
        response: {
          payload: [{
            id: 1, name: 'new recipe', ingredients: 'my ingredients', description: 'the recipe', direction: 'just do that'
          }],
          currentPage: 0,
          totalPages: 0,
          isFetching: true,
        }
      });

    const expectedActions = [
      {
        type: types.FETCH_LATEST_RECIPES_SUCCESS,
        payload: [{
          id: 1, name: 'new recipe', ingredients: 'my ingredients', description: 'the recipe', direction: 'just do that'
        }],
        currentPage: 0,
        totalPages: 0,
        isFetching: true,
      },
      { type: types.FETCH_LATEST_RECIPES_START }
    ];
    const store = mockStore({});

    store.dispatch(getAllRecipes(1, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_LATEST_RECIPES_START and FETCH_LATEST_RECIPES_FAILED actions when fetching recipes fails', () => {
    mock.onGet('/api/recipes', { params: { limit: 100, page: 100 } })
      .replyOnce(404);

    const expectedActions = [
      {
        type: types.FETCH_LATEST_RECIPES_FAILED,
      },
      { type: types.FETCH_LATEST_RECIPES_START }
    ];

    const store = mockStore({});

    store.dispatch(getAllRecipes(1, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

