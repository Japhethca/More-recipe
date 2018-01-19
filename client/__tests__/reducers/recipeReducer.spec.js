import expect from 'expect';
import reducer from '../../Recipes/recipeReducer';
import * as types from '../../Recipes/actionTypes';
import mockData from '../__mock__/mockData';
import AllinitialState from '../../store/initialState';

const initialState = AllinitialState.recipeReducer;

describe('SINGLE RECIPE reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should handle FETCH_SINGLE_RECIPE_START', () => {
    const fetchSingleRecipeStartAction = {
      type: types.FETCH_SINGLE_RECIPE_START,
    };
    expect(reducer(initialState, fetchSingleRecipeStartAction).recipe.isFetching)
      .toEqual(true);
  });

  it('should handle FETCH_SINGLE_RECIPE_FAILED', () => {
    const fetchSingleRecipeFailedAction = {
      type: types.FETCH_SINGLE_RECIPE_FAILED,
    };
    expect(reducer(initialState, fetchSingleRecipeFailedAction).recipe.payload)
      .toEqual({});
    expect(reducer(initialState, fetchSingleRecipeFailedAction).recipe.isFetching)
      .toEqual(false);
    expect(reducer(initialState, fetchSingleRecipeFailedAction).recipe.notFound)
      .toEqual(true);
  });

  it('should handle FETCH_SINGLE_RECIPE_SUCCESS', () => {
    const fetchSingleRecipe = {
      type: types.FETCH_SINGLE_RECIPE_SUCCESS,
      recipe: mockData.recipe
    };
    expect(reducer(initialState, fetchSingleRecipe).recipe.payload)
      .toEqual(mockData.recipe);
    expect(reducer(initialState, fetchSingleRecipe).recipe.isFetching)
      .toEqual(false);
  });

  it('should handle RECIPE_CREATED', () => {
    const fetchSingleRecipe = {
      type: types.RECIPE_CREATED,
    };
    expect(reducer(initialState, fetchSingleRecipe).recipe.created)
      .toEqual(true);
  });
});

describe('REVIEWS reducer', () => {
  it('should handle ADD_NEW_REVIEW_SUCCESS', () => {
    const getReview = {
      type: types.ADD_NEW_REVIEW_SUCCESS,
      review: mockData.Review
    };
    initialState.recipe.payload = mockData.recipe;
    expect(reducer(initialState, getReview).recipe.payload.Reviews[1])
      .toEqual(mockData.Review);
  });

  it('should handle ADD_NEW_REVIEW_FAILED', () => {
    const getReviewSucessAction = {
      type: types.ADD_NEW_REVIEW_FAILED,
    };
    initialState.recipe.payload = mockData.recipe;
    expect(reducer(initialState, getReviewSucessAction)
      .recipe.payload.Reviews.length)
      .toEqual(1);
  });
});

describe('VOTING reducer', () => {
  beforeEach(() => {
    initialState.recipe.payload = mockData.recipe;
    initialState.recipes.payload = mockData.recipes;
  });
  afterEach(() => {
    mockData.recipe.downvotes = 0;
  });
  it('should handle UPVOTE_RECIPE', () => {
    const { recipe } = mockData;
    recipe.upvotes = 1;
    const upvoteAction = {
      type: types.UPVOTE_RECIPE,
      recipe
    };

    expect(reducer(initialState, upvoteAction).recipe.payload.upvotes)
      .toEqual(1);
    expect(reducer(initialState, upvoteAction).recipes.payload[0].upvotes)
      .toEqual(1);
  });

  it('should handle DOWNVOTE_RECIPE', () => {
    const { recipe } = mockData;
    recipe.downvotes = 1;

    const downvoteAction = {
      type: types.DOWNVOTE_RECIPE,
      recipe
    };
    expect(reducer(initialState, downvoteAction).recipe.payload.downvotes)
      .toEqual(1);
    expect(reducer(initialState, downvoteAction).recipes.payload[0].downvotes)
      .toEqual(1);
  });
});

describe('LATEST RECIPE reducer', () => {
  beforeEach(() => {
    initialState.recipes.payload = mockData.recipes;
  });

  afterEach(() => {
    initialState.recipes.payload = [];
  });

  it('should handle FETCH_LATEST_RECIPES_START', () => {
    const latestRecipesStartAction = {
      type: types.FETCH_LATEST_RECIPES_START
    };
    expect(reducer(initialState, latestRecipesStartAction).recipes.isFetching)
      .toEqual(true);
  });

  it('should handle FETCH_LATEST_RECIPES_SUCCESS', () => {
    const latestRecipesAction = {
      type: types.FETCH_LATEST_RECIPES_SUCCESS,
      payload: mockData.recipes,
      currentPage: 1,
      totalPages: 2
    };
    expect(reducer(initialState, latestRecipesAction).recipes.isFetching)
      .toEqual(false);
    expect(reducer(initialState, latestRecipesAction).recipes.payload)
      .toEqual(mockData.recipes);
    expect(reducer(initialState, latestRecipesAction).recipes.totalPages)
      .toEqual(2);
    expect(reducer(initialState, latestRecipesAction).recipes.currentPage)
      .toEqual(1);
  });

  it('should handle FETCH_LATEST_RECIPES_FAILED', () => {
    const latestRecipesFailedAction = {
      type: types.FETCH_LATEST_RECIPES_FAILED
    };
    expect(reducer(initialState, latestRecipesFailedAction).recipes.isFetching)
      .toEqual(false);
  });
});

describe('DELETE RECIPE reducer', () => {
  beforeEach(() => {
    initialState.recipes.payload = mockData.recipes;
    initialState.userRecipes.payload = mockData.recipes;
    initialState.favorites.payload = mockData.recipes;
  });

  afterEach(() => {
    initialState.recipes.payload = [];
    initialState.userRecipes.payload = [];
    initialState.favorites.payload = [];
  });

  it('should handle DELETE_USER_RECIPE', () => {
    const deleteRecipeAction = {
      type: types.DELETE_USER_RECIPE,
      id: 1
    };
    expect(reducer(initialState, deleteRecipeAction).recipes.payload)
      .toEqual([mockData.recipes[1]]);
    expect(reducer(initialState, deleteRecipeAction).userRecipes.payload)
      .toEqual([mockData.recipes[1]]);
    expect(reducer(initialState, deleteRecipeAction).favorites.payload)
      .toEqual([mockData.recipes[1]]);
  });

  it('should handle DELETE_USER_RECIPE_FAILED', () => {
    const deleteRecipeFailedAction = {
      type: types.DELETE_USER_RECIPE_FAILED,
      id: 1
    };
    expect(reducer(initialState, deleteRecipeFailedAction).recipes.payload)
      .toEqual(mockData.recipes);
    expect(reducer(initialState, deleteRecipeFailedAction).userRecipes.payload)
      .toEqual(mockData.recipes);
    expect(reducer(initialState, deleteRecipeFailedAction).favorites.payload)
      .toEqual(mockData.recipes);
  });
});

describe('CREATE RECIPE reducer', () => {
  it('should handle ADD_NEW_RECIPE', () => {
    const createRecipeAction = {
      type: types.ADD_NEW_RECIPE,
      recipe: mockData.singleRecipe
    };
    const expected = [mockData.singleRecipe];
    expect(reducer(initialState, createRecipeAction).recipes.payload)
      .toEqual(expected);
    expect(reducer(initialState, createRecipeAction).userRecipes.payload)
      .toEqual(expected);
  });
});

describe('USER RECIPES reducer', () => {
  it('should handle FETCH_USER_RECIPES_START', () => {
    const getUserRecipesStartAction = {
      type: types.FETCH_USER_RECIPES_START,
    };
    expect(reducer(initialState, getUserRecipesStartAction).userRecipes.isFetching)
      .toEqual(true);
  });

  it('should handle FETCH_USER_RECIPES_SUCCESS', () => {
    const getUserRecipesAction = {
      type: types.FETCH_USER_RECIPES_SUCCESS,
      isFetching: false,
      payload: mockData.recipes,
    };
    expect(reducer(initialState, getUserRecipesAction).userRecipes.payload)
      .toEqual(mockData.recipes);
    expect(reducer(initialState, getUserRecipesAction).userRecipes.isFetching)
      .toEqual(false);
    expect(reducer(initialState, getUserRecipesAction).recipe.created)
      .toEqual(false);
  });

  it('should handle FETCH_USER_RECIPES_FAILED', () => {
    const getUserRecipesFailedAction = {
      type: types.FETCH_USER_RECIPES_FAILED,
    };
    expect(reducer(initialState, getUserRecipesFailedAction).userRecipes.isFetching)
      .toEqual(false);
  });
});

describe('FAVORITES reducer', () => {
  it('should handle FETCH_USER_FAVORITES_START', () => {
    const getUserFavoritesStartAction = {
      type: types.FETCH_USER_FAVORITES_START,
    };
    expect(reducer(initialState, getUserFavoritesStartAction).favorites.isFetching)
      .toEqual(true);
  });

  it('should handle FETCH_USER_FAVORITES_SUCCESS', () => {
    const getUserFavoritesAction = {
      type: types.FETCH_USER_FAVORITES_SUCCESS,
      isFetching: false,
      payload: mockData.recipes,
    };
    expect(reducer(initialState, getUserFavoritesAction).favorites.payload)
      .toEqual(mockData.recipes);
    expect(reducer(initialState, getUserFavoritesAction).favorites.isFetching)
      .toEqual(false);
  });

  it('should handle FETCH_USER_FAVORITES_FAILED', () => {
    const getUserFailedFailedAction = {
      type: types.FETCH_USER_FAVORITES_FAILED,
    };
    expect(reducer(initialState, getUserFailedFailedAction).favorites.isFetching)
      .toEqual(false);
  });

  it('should handle REMOVE_FROM_FAVORITES', () => {
    initialState.favorites.payload = mockData.recipes;
    const removeFromFavoritesAction = {
      type: types.REMOVE_FROM_FAVORITES,
      id: 1
    };
    expect(reducer(initialState, removeFromFavoritesAction).favorites.payload)
      .toEqual([mockData.recipes[1]]);
  });

  it('should handle REMOVE_FROM_FAVORITES_FAILED', () => {
    initialState.favorites.payload = mockData.recipes;
    const removeFromFavoritesAction = {
      type: types.REMOVE_FROM_FAVORITES_FAILED,
      id: 1
    };
    expect(reducer(initialState, removeFromFavoritesAction).favorites.payload)
      .toEqual(mockData.recipes);
  });
});

describe('ADD TO FAVORITES reducer', () => {
  it('should handle ADD_TO_FAVORITES', () => {
    initialState.favorites.payload = [];
    const recipe = mockData.singleRecipe;
    const AddToFavoritesAction = {
      type: types.ADD_TO_FAVORITES,
      recipe
    };
    expect(reducer(initialState, AddToFavoritesAction).favorites.payload)
      .toEqual([mockData.singleRecipe]);
  });
});
