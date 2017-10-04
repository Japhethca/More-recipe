import express from 'express';
import auth from '../middlewares/authenticator';
import UserController from '../controllers/usersContr';
import RecipeController from '../controllers/recipeContr';
import ReviewController from '../controllers/reviewsContr';
import FavoriteController from '../controllers/favoriteContr';
import votes from '../controllers/votesContr';
import fileUpload from '../controllers/fileUpload';

const apiV1 = express.Router();

// API route for user creation and and Login route
apiV1.post('/users/signup', UserController.signup)
  .all('/users/signup', auth.notImplemented);
apiV1.post('/users/signin', UserController.signin)
  .all('/users/signin', auth.notImplemented);
// sortes recipes in ascending order

// API routes for GETting and POSTing recipes
apiV1.get('/recipes', RecipeController.listUpvotes, RecipeController.all)
  .post('/recipes', RecipeController.createRecipe)
  .all('/recipes', auth.notImplemented);

// API end point for updating and deleting a single recipe
apiV1.put('/recipes/:recipeId', RecipeController.updateRecipe)
  .delete('/recipes/:recipeId', RecipeController.deleteRecipe)
  .get('/recipes/:recipeId', RecipeController.getRecipeById)
  .all('/recipes/:recipeId', auth.notImplemented);


// endpoint for getting users favorite recipes
apiV1.get('/users/:usersId/recipes', FavoriteController.getUserFavorites)
  .all('/users/:userId/recipes', auth.notImplemented);

// End point for users to get and set favorite recipes
apiV1.get('/users/:usersId/favorites', FavoriteController.getFavorites)
  .post('/users/:recipeId/favorites', FavoriteController.setFavorites)
  .delete('/users/:recipeId/favorites', FavoriteController.removeRecipeFromFavorites)
  .all('/users/:usersId/favorites', auth.notImplemented);


// routes  for up voting and down voting recipes
apiV1.put('/recipes/:recipeId/upvotes', votes.upVotes)
  .all('/recipes/:recipeId/upvotes', auth.notImplemented);
apiV1.put('/recipes/:recipeId/downvotes', votes.downVote)
  .all('/recipes/:recipeId/downvotes', auth.notImplemented);


// Recipe review and update API endpoints
apiV1.post('/recipes/:recipeId/reviews', ReviewController.recipeReview)
  .get('/recipes/:recipeId/reviews', ReviewController.getRecipeReview)
  .all('/recipes/:recipeId/reviews', auth.notImplemented);

// Route for getting recipes created by a single user
apiV1.get('/users/recipes', RecipeController.getUserRecipes)
  .all('/users/recipes', auth.notImplemented);

apiV1.get('/admin/users', UserController.users);
// handle file upload
apiV1.post('/upload', fileUpload);


export default apiV1;
