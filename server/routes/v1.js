import express from 'express';

import auth from '../middlewares/authenticator';
import { signupValidator, signinValidator,
  reviewPostValidator, recipeValidator, checkParams } from '../middlewares/validators';
import * as UserController from '../controllers/userController';
import RecipeReview from '../controllers/reviewController';
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
  .post('/recipes', recipeValidator, RecipeController.createRecipe)
  .all('/recipes', auth.notImplemented);

// Endpoints for getting, updating and deleting a single recipe
apiV1.put('/recipes/:recipeId', checkParams, recipeValidator, RecipeController.updateRecipe)
  .delete('/recipes/:recipeId', checkParams, RecipeController.deleteRecipe)
  .get('/recipes/:recipeId', checkParams, RecipeController.getRecipeById)
  .all('/recipes/:recipeId', auth.notImplemented);

// Endpoints for Getting all recipe in favorites
apiV1.get('/users/:usersId/recipes', checkParams, FavoriteController.getUserFavorites)
  .all('/users/:userId/recipes', auth.notImplemented);

// Endpoints for users to get, set and remove favorite recipes
apiV1.get('/users/favorites', FavoriteController.getUserFavorites)
  .post('/users/favorites/:recipeId', checkParams, FavoriteController.addToFavorites)
  .delete('/users/favorites/:recipeId', checkParams, FavoriteController.removeFromFavorites)
  .all('/users/favorites/:recipeId', auth.notImplemented);


// Endpoints  for upvoting and down voting recipes
apiV1.put('/recipes/:recipeId/upvotes', checkParams, upVote)
  .all('/recipes/:recipeId/upvotes', auth.notImplemented);
apiV1.put('/recipes/:recipeId/downvotes', checkParams, downVote)
  .all('/recipes/:recipeId/downvotes', auth.notImplemented);


// Enpoints for adding and getting a single review to recipe
apiV1.post('/recipes/:recipeId/reviews', checkParams, reviewPostValidator, RecipeReview)
  .all('/recipes/:recipeId/reviews', auth.notImplemented);

// Enpoint for getting recipes created by a single user
apiV1.get('/users/recipes', RecipeController.getUserRecipes)
  .all('/users/recipes', auth.notImplemented);

// Endpoint for getting user info  by id and also getting user profile
apiV1.get('/users/profile', UserController.userProfile);
apiV1.put('/users/profile', UserController.updateProfile);


export default apiV1;
