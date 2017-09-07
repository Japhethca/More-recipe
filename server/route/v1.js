import express from 'express';
import auth from '../middlewares/authenticator';
import  UserController from '../controllers/usersContr';
import  RecipeController from '../controllers/recipeContr';
import  ReviewController from '../controllers/reviewsContr';
import FavoriteController from '../controllers/favoriteContr';
import  votes from '../controllers/votesContr';

const apiV1 = express.Router();

// API route for user creation and and Login route
apiV1.post('/users/signup', UserController.signup)
  .all('/users/signup', auth.notImplemented);
apiV1.post('/users/signin', UserController.signin)
  .all('/users/signin', auth.notImplemented);

// API routes for GETting and POSTing recipes
apiV1.get('/recipes', RecipeController.all)
  .post('/recipes', RecipeController.create)
  .all('/recipes', auth.notImplemented);

// API end point for updating and deleting a single recipe
apiV1.put('/recipes/:recipeId', RecipeController.updateRecipe)
  .delete('/recipes/:recipeId', RecipeController.deleteRecipe)
  .get('/recipes/:recipeId', RecipeController.getRecipeById)
  .all('/recipes/:recipeId', auth.notImplemented);


// apiV1.get('/users/:userId/recipes',userRecipes);
apiV1.get('/recipes?sort=upvotes&order=descending', auth.notImplemented)
  .all('/recipes?sort=upvotes&order=descending', auth.notImplemented);

apiV1.get('/users/:userId/recipes', FavoriteController.getFavorites)
  .all('/users/:userId/recipes', auth.notImplemented);

// End point for users to get  favorite recipes 
apiV1.get('/users/:usersId/favorites', FavoriteController.getFavorites)
  .all('/users/:usersId/favorites', auth.notImplemented);

// Endpoint for adding recipe to users favorites
apiV1.post('/users/:recipeId/favorites', FavoriteController.setFavorites);
// apiV1.get('/recipes/:recipeId/upvotes', RecipeController.default.upvotes);

// Recipe review and update API endpoints
apiV1.post('/recipes/:recipeId/reviews', ReviewController.recipeReview)
  .get('/recipes/:recipeId/reviews', ReviewController.getRecipeReview)
  .all('/recipes/:recipeId/reviews', auth.notImplemented);


export  default apiV1;
