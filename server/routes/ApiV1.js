import express from 'express';

import Authenticator from '../middlewares/Authenticator';
import { signupValidator, signinValidator,
  reviewPostValidator, recipeValidator, checkParams } from '../middlewares/validators';
import * as UserController from '../controllers/UserController';
import { postReview, getRecipeReview } from '../controllers/ReviewController';
import * as RecipeController from '../controllers/RecipeController';
import * as FavoriteController from '../controllers/FavoriteController';
import { upVote, downVote } from '../controllers/VotingController';

const ApiV1 = express.Router();

// Endpoints for user login and signup
ApiV1.post('/users/signup', signupValidator, UserController.signup)
  .all('/users/signup', Authenticator.notImplemented);
ApiV1.post('/users/signin', signinValidator, UserController.signin)
  .all('/users/signin', Authenticator.notImplemented);

// Endpoint for getting all recipes and adding new recipe
ApiV1.get(
  '/recipes',
  RecipeController.sortOrOrderRecipes,
  RecipeController.searchRecipe,
  RecipeController.allRecipes
)
  .all('/recipes', Authenticator.notImplemented);

// Endpoints for getting, updating and deleting a single recipe
ApiV1.post('/recipe', recipeValidator, RecipeController.createRecipe)
  .put('/recipe/:recipeId', checkParams, recipeValidator, RecipeController.updateRecipe)
  .delete('/recipe/:recipeId', checkParams, RecipeController.deleteRecipe)
  .get('/recipe/:recipeId', checkParams, RecipeController.getRecipeById)
  .all('/recipe/:recipeId', Authenticator.notImplemented);

// Endpoints for users to get, set and remove favorite recipes
ApiV1.get('/users/favorites', FavoriteController.getUserFavorites)
  .post('/users/favorites/:recipeId', checkParams, FavoriteController.addToFavorites)
  .delete('/users/favorites/:recipeId', checkParams, FavoriteController.removeFromFavorites)
  .all('/users/favorites/:recipeId', Authenticator.notImplemented);


// Endpoints  for upvoting and down voting recipes
ApiV1.put('/recipe/:recipeId/upvote', checkParams, upVote)
  .all('/recipe/:recipeId/upvote', Authenticator.notImplemented);
ApiV1.put('/recipe/:recipeId/downvote', checkParams, downVote)
  .all('/recipe/:recipeId/downvote', Authenticator.notImplemented);


// Enpoints for adding and getting a single review to recipe
ApiV1.post('/recipe/:recipeId/review', checkParams, reviewPostValidator, postReview)
  .all('/recipe/:recipeId/review', Authenticator.notImplemented);
ApiV1.get('/recipe/:recipeId/reviews', checkParams, getRecipeReview)
  .all('/recipe/:recipeId/reviews', Authenticator.notImplemented);

// Enpoint for getting recipes created by a single user
ApiV1.get('/users/recipes', RecipeController.getUserRecipes)
  .all('/users/recipes', Authenticator.notImplemented);

// Endpoint for getting user info  by id and also getting user profile
ApiV1.get('/users/profile', UserController.userProfile);
ApiV1.put('/users/profile', UserController.updateProfile);


export default ApiV1;
