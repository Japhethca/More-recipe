import expect from 'expect';
import axios from 'axios';

import mockData from '../__mock__/mockData';
import mockStore, { mock } from '../__mock__/configMockStore';
import * as types from '../../Recipes/actionTypes';
import getAllRecipes from '../../HomePage/actions';
import * as dashboardActions from '../../Dashboard/actions';
import * as recipeActions from '../../Recipes/actions';

describe('Recipes actions >>', () => {
  describe('LATEST RECIPES actions', () => {
    it('dispatches FETCH_LATEST_RECIPES_START and FETCH_LATEST_RECIPES_SUCCESS '
     + 'actions when fetching recipes has been done', () => {
      mock.onGet('/api/recipes?limit=12&page=1')
        .replyOnce(200, {
          recipes: mockData.recipes,
          count: 3
        });

      const expectedActions = [
        { type: types.FETCH_LATEST_RECIPES_START },
        {
          type: types.FETCH_LATEST_RECIPES_SUCCESS,
          payload: mockData.recipes,
          currentPage: 1,
          totalPages: 1,
        },
      ];
      const store = mockStore({});

      store.dispatch(getAllRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches FETCH_LATEST_RECIPES_START and FETCH_LATEST_RECIPES_FAILED ' +
    'actions when fetching recipes fails', () => {
      mock.onGet('/api/recipes?limit=12&page=1')
        .replyOnce(404);

      const expectedActions = [
        { type: types.FETCH_LATEST_RECIPES_START },
        { type: types.FETCH_LATEST_RECIPES_FAILED },
      ];

      const store = mockStore({});

      store.dispatch(getAllRecipes(1, 1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('SINGLE RECIPE actions', () => {
    it(
      'should dispatch FETCH_SINGLE_RECIPE_START when starting to fetch recipe',
      () => {
        mock.onGet('/api/recipe/1')
          .replyOnce(200);

        const expectedActions = [
          {
            type: types.FETCH_SINGLE_RECIPE_START
          }
        ];

        const store = mockStore({});

        store.dispatch(recipeActions.getSingleRecipe(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );

    it(
      'should dispatch FETCH_SINGLE_RECIPE_SUCCESS when single recipe is fetched',
      () => {
        mock.onGet('/api/recipe/1')
          .replyOnce(200, {
            recipe: mockData.recipe
          });

        const expectedActions = [
          {
            type: types.FETCH_SINGLE_RECIPE_START
          },
          {
            type: types.FETCH_SINGLE_RECIPE_SUCCESS,
            recipe: mockData.recipe
          }
        ];

        const store = mockStore({});

        store.dispatch(recipeActions.getSingleRecipe(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );

    it('should dispatch FETCH_SINGLE_RECIPE_FAILED when fetch fails', () => {
      mock.onGet('/api/recipe/1')
        .replyOnce(404);

      const expectedActions = [
        {
          type: types.FETCH_SINGLE_RECIPE_START
        },
        {
          type: types.FETCH_SINGLE_RECIPE_FAILED
        }
      ];

      const store = mockStore({});

      store.dispatch(recipeActions.getSingleRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('USER FAVORITES actions', () => {
    it('should dispatch FETCH_USER_FAVORITES_START when ' +
    'starting to fetch favorites', () => {
      mock.onGet('/api/users/favorites')
        .replyOnce(200, {
          favorites: mockData.favorites
        });
      const expectedActions = [
        {
          type: types.FETCH_USER_FAVORITES_START
        },
        {
          type: types.FETCH_USER_FAVORITES_SUCCESS,
          payload: [mockData.recipes[1]]
        },
      ];
      const store = mockStore({});

      store.dispatch(dashboardActions.handleGetFavorites())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch FETCH_USER_FAVORITES_SUCCESS ' +
    'when fetch is complete', () => {
      mock.onGet('/api/users/favorites')
        .replyOnce(200, {
          favorites: mockData.favorites,
          message: ''
        });
      const expectedActions = [
        {
          type: types.FETCH_USER_FAVORITES_START
        },
        {
          type: types.FETCH_USER_FAVORITES_SUCCESS,
          payload: [mockData.recipes[1]]
        }
      ];
      const store = mockStore({});

      store.dispatch(dashboardActions.handleGetFavorites())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch FETCH_USER_FAVORITES_FAILED when fetch fails', () => {
      mock.onGet('/api/users/favorites')
        .replyOnce(404);
      const expectedActions = [
        {
          type: types.FETCH_USER_FAVORITES_START
        },
        {
          type: types.FETCH_USER_FAVORITES_FAILED,
        }
      ];
      const store = mockStore({});

      store.dispatch(dashboardActions.handleGetFavorites())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('USER RECIPES actions', () => {
    it('should dispatch FETCH_USER_RECIPES_START when ' +
    'starting for fetch user recipes', () => {
      mock.onGet('/api/users/recipes')
        .replyOnce(200, { recipes: mockData.recipes });
      const expectedActions = [
        {
          type: types.FETCH_USER_RECIPES_START,
        },
        {
          type: types.FETCH_USER_RECIPES_SUCCESS,
          payload: mockData.recipes
        }
      ];
      const store = mockStore({});

      store.dispatch(dashboardActions.handleGetUserRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch FETCH_USER_RECIPES_SUCCESS when user' +
    'recipes has been fetched', () => {
      mock.onGet('/api/users/recipes')
        .replyOnce(200, {
          recipes: mockData.recipes
        });
      const expectedActions = [
        {
          type: types.FETCH_USER_RECIPES_START,
        },
        {
          type: types.FETCH_USER_RECIPES_SUCCESS,
          payload: mockData.recipes
        }
      ];
      const store = mockStore({});

      store.dispatch(dashboardActions.handleGetUserRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch FETCH_USER_RECIPES_FAILED when request fails', () => {
      mock.onGet('/api/users/recipes')
        .replyOnce(404, { message: 'recipe not created' });
      const expectedActions = [
        {
          type: types.FETCH_USER_RECIPES_START,
        },
        {
          type: types.FETCH_USER_RECIPES_FAILED,
        }
      ];
      const store = mockStore({});

      store.dispatch(dashboardActions.handleGetUserRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('DELETE RECIPE actions', () => {
    it('should dispatch DELETE_USER_RECIPE when recipe is deleted', () => {
      mock.onDelete('/api/recipe/1', { params: { id: 1 } })
        .replyOnce(200, { message: 'recipe deleted successfully' });
      const expectedActions = [
        {
          type: types.DELETE_USER_RECIPE,
          id: 1
        }
      ];
      const store = mockStore({});

      store.dispatch((recipeActions.handleDeleteRecipe(1)))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch DELETE_USER_RECIPE_FAILED when recipe ' +
  'deletion fails', () => {
      mock.onDelete('/api/recipe/1')
        .replyOnce(400, { message: 'failed to delete recipe' });
      const expectedActions = [
        {
          type: types.DELETE_USER_RECIPE_FAILED
        }
      ];
      const store = mockStore({});

      store.dispatch((recipeActions.handleDeleteRecipe(1)))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('CREATE RECIPE actions', () => {
    const recipeData = {
      name: 'egusi recipe',
      description: 'a nice food',
      direction: "just cook it you'll see",
      ingredients: 'thats it'
    };

    it('should dispatch ADD_NEW_RECIPE when recipe is created', () => {
      mock.onPost('/api/recipe', recipeData)
        .replyOnce(201, {
          recipe: mockData.singleRecipe,
          message: 'recipe created successfully'
        });

      const expectedActions = [
        {
          type: types.IS_FETCHING,
          isFetching: true
        },
        { type: types.RECIPE_CREATED },
        {
          type: types.ADD_NEW_RECIPE,
          recipe: mockData.singleRecipe
        },
        {
          type: types.IS_FETCHING,
          isFetching: false
        },
      ];
      const store = mockStore({});

      store.dispatch((recipeActions.handleCreateRecipe(recipeData)))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('UPDATE RECIPE actions', () => {
    const recipeData = {
      name: 'egusi recipe',
      description: 'a nice food',
      direction: 'new direction',
      ingredients: 'thats it'
    };

    it('should dispatch UPDATE_RECIPE type when recipe is created', () => {
      mock.onPost('/api/recipe', recipeData)
        .replyOnce(201, {
          recipe: mockData.singleRecipe,
          message: 'recipe updated successfully'
        });

      const expectedActions = [

        {
          type: types.UPDATE_RECIPE,
          recipe: mockData.singleRecipe
        }
      ];
      const store = mockStore({});

      store.dispatch((recipeActions.handleUpdateRecipe(recipeData)))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});

describe('Recipes action creators >>', () => {
  describe('USER RECIPES ACTION CREATORS', () => {
    it('should return  FETCH_USER_RECIPES_START action type', () => {
      const expectedActions = () => (
        {
          type: types.FETCH_USER_RECIPES_START,
        });
      expect(dashboardActions.fetchUserRecipesStartAction()
        .type).toEqual(expectedActions().type);
    });

    it('should return  FETCH_USER_RECIPES_FAILED action', () => {
      const expectedActions = () => (
        {
          type: types.FETCH_USER_RECIPES_FAILED,
        });
      expect(dashboardActions.fetchUserRecipesFailedAction().type)
        .toEqual(expectedActions().type);
    });

    it('should return  FETCH_USER_RECIPES_SUCCESS action', () => {
      const expectedActions = payload => (
        {
          type: types.FETCH_USER_RECIPES_SUCCESS,
          payload
        });
      expect(dashboardActions.userRecipesAction({}).type)
        .toEqual(expectedActions({}).type);
      expect(dashboardActions.userRecipesAction({}).payload)
        .toEqual(expectedActions({}).payload);
    });
  });

  describe('USER FAVORITES ACTION CREATORS', () => {
    it('should return  FETCH_USER_FAVORITES_START action', () => {
      const expectedActions = () => (
        {
          type: types.FETCH_USER_FAVORITES_START,
        });
      expect(dashboardActions.getFavoritesStartAction()
        .type).toEqual(expectedActions().type);
    });

    it('should return  FETCH_USER_FAVORITES_FAILED action', () => {
      const expectedActions = () => (
        {
          type: types.FETCH_USER_FAVORITES_FAILED,
        });
      expect(dashboardActions.getFavoritesFailedAction()
        .type).toEqual(expectedActions().type);
    });

    it('should return  FETCH_USER_FAVORITES_SUCCESS action', () => {
      const expectedActions = payload => (
        {
          type: types.FETCH_USER_FAVORITES_SUCCESS,
          payload
        });
      expect(dashboardActions.getFavoritesAction({})
        .type).toEqual(expectedActions({}).type);
      expect(dashboardActions.getFavoritesAction({})
        .payload).toEqual(expectedActions({}).payload);
    });
  });


  describe('FETCH SINGLE RECIPE ACTION CREATORS', () => {
    it('should return  FETCH_SINGLE_RECIPE_START action', () => {
      const expectedActions = () => (
        {
          type: types.FETCH_SINGLE_RECIPE_START,
        });
      expect(recipeActions.fetchSingleRecipeStart()
        .type).toEqual(expectedActions().type);
    });

    it('should return  FETCH_SINGLE_RECIPE_FAILED action', () => {
      const expectedActions = () => (
        {
          type: types.FETCH_SINGLE_RECIPE_FAILED,
        });
      expect(recipeActions.fetchSingleRecipeFailed()
        .type).toEqual(expectedActions().type);
    });

    it('should return  FETCH_SINGLE_RECIPE_SUCCESS action', () => {
      const expectedActions = recipe => (
        {
          type: types.FETCH_SINGLE_RECIPE_SUCCESS,
          recipe
        });
      expect(recipeActions.fetchSingleRecipe({})
        .type).toEqual(expectedActions({}).type);
      expect(recipeActions.fetchSingleRecipe({})
        .recipe).toEqual(expectedActions({}).recipe);
    });
  });


  describe('DELETE RECIPE ACTION CREATORS', () => {
    it('should return  DELETE_USER_RECIPE_FAILED action', () => {
      const expectedActions = () => (
        {
          type: types.DELETE_USER_RECIPE_FAILED,
        });
      expect(recipeActions.deleteRecipeActionFailed()
        .type).toEqual(expectedActions().type);
    });

    it('should return  DELETE_USER_RECIPE action', () => {
      const expectedActions = id => (
        {
          type: types.DELETE_USER_RECIPE,
          id
        });
      expect(recipeActions.deleteRecipeAction(1)
        .type).toEqual(expectedActions(1).type);
      expect(recipeActions.deleteRecipeAction(1)
        .id).toEqual(expectedActions(1).id);
    });
  });

  describe('REMOVE FROM FAVORITE ACTION CREATORS', () => {
    it('should return  REMOVE_FROM_FAVORITES_FAILED action type', () => {
      const expectedActions = () => (
        {
          type: types.REMOVE_FROM_FAVORITES_FAILED,
        });
      expect(recipeActions.removeFavoritesActionFailed()
        .type).toEqual(expectedActions().type);
    });

    it('should return  REMOVE_FROM_FAVORITES action', () => {
      const expectedActions = id => (
        {
          type: types.REMOVE_FROM_FAVORITES,
          id
        });
      expect(recipeActions.removeFavoritesAction(1)
        .type).toEqual(expectedActions(1).type);
      expect(recipeActions.removeFavoritesAction(1)
        .id).toEqual(expectedActions(1).id);
    });
  });


  describe('ADD TO FAVORITE ACTION CREATORS', () => {
    it('should return  ADD_TO_FAVORITES_FAILED action', () => {
      const expectedActions = () => (
        {
          type: types.ADD_TO_FAVORITES_FAILED,
        });
      expect(recipeActions.addToFavoriteActionFailed()
        .type).toEqual(expectedActions().type);
    });

    it('should return  ADD_TO_FAVORITES action', () => {
      const expectedActions = recipe => (
        {
          type: types.ADD_TO_FAVORITES,
          recipe
        });
      expect(recipeActions.addToFavoriteAction({})
        .type).toEqual(expectedActions({}).type);
      expect(recipeActions.addToFavoriteAction({})
        .id).toEqual(expectedActions({}).id);
    });
  });

  describe('UPDATE & CREATE RECIPE ACTION CREATORS', () => {
    it('should return  UPDATE_RECIPE action', () => {
      const expectedActions = recipe => (
        {
          type: types.UPDATE_RECIPE,
          recipe
        });
      expect(recipeActions.updateRecipeAction()
        .type).toEqual(expectedActions().type);
    });

    it('should return  ADD_NEW_RECIPE action', () => {
      const expectedActions = recipe => (
        {
          type: types.ADD_NEW_RECIPE,
          recipe
        });
      expect(recipeActions.createRecipeAction(1)
        .type).toEqual(expectedActions(1).type);
    });

    it('should return  RECIPE_CREATED action', () => {
      const expectedActions = () => (
        {
          type: types.RECIPE_CREATED
        });
      expect(recipeActions.created(1).type).toEqual(expectedActions(1).type);
    });

    it('should return  IS_FETCHING action', () => {
      const expectedActions = state => (
        {
          type: types.IS_FETCHING,
          isFetching: state
        });
      expect(recipeActions.isFetching(false)).toEqual(expectedActions(false));
      expect(recipeActions.isFetching(false)
        .type).toEqual(expectedActions(false).type);
    });
  });
});
