import express from 'express';

import auth from '../middlewares/authenticator';
import UserController from '../controllers/UserController';
import RecipeController from '../controllers/RecipeController';
import ReviewController from '../controllers/ReviewController';
import FavoriteController from '../controllers/FavoriteController';
import votes from '../controllers/VotingController';

const apiV1 = express.Router();

// Endpoints for user login and signup
apiV1.post('/users/signup', UserController.signup)
  .all('/users/signup', auth.notImplemented);
apiV1.post('/users/signin', UserController.signin)
  .all('/users/signin', auth.notImplemented);

// Endpoint for getting all recipes and adding new recipe
apiV1.get('/recipes', RecipeController.listUpvotes, RecipeController.all)
  .post('/recipes', RecipeController.createRecipe)
  .all('/recipes', auth.notImplemented);

// Endpoints for getting, updating and deleting a single recipe
apiV1.put('/recipes/:recipeId', RecipeController.updateRecipe)
  .delete('/recipes/:recipeId', RecipeController.deleteRecipe)
  .get('/recipes/:recipeId', RecipeController.getRecipeById)
  .all('/recipes/:recipeId', auth.notImplemented);

// Endpoints for Getting all recipe in favorites
apiV1.get('/users/:usersId/recipes', FavoriteController.getUserFavorites)
  .all('/users/:userId/recipes', auth.notImplemented);

// Endpoints for users to get, set and remove favorite recipes
apiV1.get('/users/:usersId/favorites', FavoriteController.getUserFavorites)
  .post('/users/:recipeId/favorites', FavoriteController.setFavorites)
  .delete('/users/:recipeId/favorites', FavoriteController.removeRecipeFromFavorites)
  .all('/users/:usersId/favorites', auth.notImplemented);


// Endpoints  for upvoting and down voting recipes
apiV1.put('/recipes/:recipeId/upvotes', votes.upVotes)
  .all('/recipes/:recipeId/upvotes', auth.notImplemented);
apiV1.put('/recipes/:recipeId/downvotes', votes.downVote)
  .all('/recipes/:recipeId/downvotes', auth.notImplemented);


// Enpoints for adding and getting a single review to recipe
apiV1.post('/recipes/:recipeId/reviews', ReviewController.recipeReview)
  .get('/recipes/:recipeId/reviews', ReviewController.getRecipeReview)
  .all('/recipes/:recipeId/reviews', auth.notImplemented);

// Enpoint for getting recipes created by a single user
apiV1.get('/users/recipes', RecipeController.getUserRecipes)
  .all('/users/recipes', auth.notImplemented);

// Endpoint for getting user info  by id and also getting user profile
apiV1.get('/admin/user/:userId', UserController.user);
apiV1.get('/users/profile', UserController.userProfile);
apiV1.post('/users/profile', UserController.updateProfile);


// Enpoint for getting all reviews
apiV1.get('/reviews', ReviewController.getAllReview);


export default apiV1;
