'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiV1 = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var UserController = _interopRequireWildcard(_userController);

var _recipeController = require('../controllers/recipeController');

var RecipeController = _interopRequireWildcard(_recipeController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiV1 = _express2.default.Router();

// API route for user creation and and Login route
apiV1.post('/users/signup', UserController.default.signup);
apiV1.post('/users/signin', UserController.default.signin);

// API routes for GETting and POSTing recipes
apiV1.get('/recipes', RecipeController.default.all).post('/recipes', RecipeController.default.create);

// API end point for updating and deleting a single recipe
apiV1.put('/recipes/:recipeId', RecipeController.default.updateRecipe).delete('/recipes/:recipeId', RecipeController.default.deleteRecipe).get('/recipes/:recipeId', RecipeController.default.getRecipeById);

// apiV1.get('/users/:userId/recipes',userRecipes);
apiV1.get('recipes?sort=upvotes&order=descending', RecipeController.default.filter);
// apiV1.get('/user/:userId/favorites',userFavorites);
// apiV1.post('/user/:recipeId/favorites',userFavorites);
// apiV1.get('/recipes/:recipeId/upvotes', RecipeController.default.upvotes);

// Recipe review and update API endpoints
apiV1.post('/recipes/:recipeId/reviews', RecipeController.default.recipeReview).get('/recipes/:recipeId/reviews', RecipeController.default.getRecipeReview);

exports.apiV1 = apiV1;