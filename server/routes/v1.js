import express from 'express';

import auth from '../middlewares/authenticator';
import { signupValidator, signinValidator,
  reviewPostValidator, recipeValidator, checkParams } from '../middlewares/validators';
import * as UserController from '../controllers/userController';
import { recipeReview, getRecipeReview } from '../controllers/reviewController';
import * as RecipeController from '../controllers/recipeController';
import * as FavoriteController from '../controllers/favoriteController';
import { upVote, downVote } from '../controllers/votingController';

const apiV1 = express.Router();

// Endpoints for user login and signup
apiV1.post('/users/signup', signupValidator, UserController.signup)
  .all('/users/signup', auth.notImplemented);
apiV1.post('/users/signin', signinValidator, UserController.signin)
  .all('/users/signin', auth.notImplemented);

// Endpoint for getting all recipes and adding new recipe
apiV1.get(
  '/recipes',
  RecipeController.sortOrOrderRecipes,
  RecipeController.searchRecipe,
  RecipeController.allRecipes
)
  .all('/recipes', auth.notImplemented);

// Endpoints for getting, updating and deleting a single recipe
apiV1.post('/recipe', recipeValidator, RecipeController.createRecipe)
  .put('/recipe/:recipeId', checkParams, recipeValidator, RecipeController.updateRecipe)
  .delete('/recipe/:recipeId', checkParams, RecipeController.deleteRecipe)
  .get('/recipe/:recipeId', checkParams, RecipeController.getRecipeById)
  .all('/recipe/:recipeId', auth.notImplemented);

// Endpoints for users to get, set and remove favorite recipes
apiV1.get('/users/favorites', FavoriteController.getUserFavorites)
  .post('/users/favorites/:recipeId', checkParams, FavoriteController.addToFavorites)
  .delete('/users/favorites/:recipeId', checkParams, FavoriteController.removeFromFavorites)
  .all('/users/favorites/:recipeId', auth.notImplemented);


// Endpoints  for upvoting and down voting recipes
apiV1.put('/recipe/:recipeId/upvote', checkParams, upVote)
  .all('/recipe/:recipeId/upvote', auth.notImplemented);
apiV1.put('/recipe/:recipeId/downvote', checkParams, downVote)
  .all('/recipe/:recipeId/downvote', auth.notImplemented);


// Enpoints for adding and getting a single review to recipe
apiV1.post('/recipe/:recipeId/review', checkParams, reviewPostValidator, recipeReview)
  .all('/recipe/:recipeId/review', auth.notImplemented);
apiV1.get('/recipe/:recipeId/reviews', checkParams, getRecipeReview)
  .all('/recipe/:recipeId/reviews', auth.notImplemented);

// Enpoint for getting recipes created by a single user
apiV1.get('/users/recipes', RecipeController.getUserRecipes)
  .all('/users/recipes', auth.notImplemented);

// Endpoint for getting user info  by id and also getting user profile
apiV1.get('/users/profile', UserController.userProfile);
apiV1.put('/users/profile', UserController.updateProfile);


export default apiV1;
