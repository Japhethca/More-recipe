import express from 'express';
import * as UserController from '../controllers/userController';
import * as RecipeController from '../controllers/recipeController';

const apiV1 = express.Router();

// API route for user creation and and Login route
apiV1.post('/users/signup', UserController.default.signup);
apiV1.post('/users/signin', UserController.default.signin);

// API routes for GETting and POSTing recipes
apiV1.get('/recipes', RecipeController.default.all)
  .post('/recipes', RecipeController.default.create);

// API end point for updating and deleting a single recipe
apiV1.put('/recipes/:recipeId', RecipeController.default.updateRecipe)
  .delete('/recipes/:recipeId', RecipeController.default.deleteRecipe)
  .get('/recipes/:recipeId', RecipeController.default.getRecipeById);

// apiV1.get('/users/:userId/recipes',userRecipes);
apiV1.get('recipes?sort=upvotes&order=descending', RecipeController.default.filter);
// apiV1.get('/user/:userId/favorites',userFavorites);
// apiV1.post('/user/:recipeId/favorites',userFavorites);
// apiV1.get('/recipes/:recipeId/upvotes', RecipeController.default.upvotes);

// Recipe review and update API endpoints
apiV1.post('/recipes/:recipeId/reviews', RecipeController.default.recipeReview)
  .get('/recipes/:recipeId/reviews', RecipeController.default.getRecipeReview);


export { apiV1 };
