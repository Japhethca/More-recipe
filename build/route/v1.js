'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticator = require('../middlewares/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _usersContr = require('../controllers/usersContr');

var _usersContr2 = _interopRequireDefault(_usersContr);

var _recipeContr = require('../controllers/recipeContr');

var _recipeContr2 = _interopRequireDefault(_recipeContr);

var _reviewsContr = require('../controllers/reviewsContr');

var _reviewsContr2 = _interopRequireDefault(_reviewsContr);

var _favoriteContr = require('../controllers/favoriteContr');

var _favoriteContr2 = _interopRequireDefault(_favoriteContr);

var _votesContr = require('../controllers/votesContr');

var _votesContr2 = _interopRequireDefault(_votesContr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiV1 = _express2.default.Router();

// API route for user creation and and Login route
apiV1.post('/users/signup', _usersContr2.default.signup).all('/users/signup', _authenticator2.default.notImplemented);
apiV1.post('/users/signin', _usersContr2.default.signin).all('/users/signin', _authenticator2.default.notImplemented);

// API routes for GETting and POSTing recipes
apiV1.get('/recipes', _recipeContr2.default.all).post('/recipes', _recipeContr2.default.create).all('/recipes', _authenticator2.default.notImplemented);

// API end point for updating and deleting a single recipe
apiV1.put('/recipes/:recipeId', _recipeContr2.default.updateRecipe).delete('/recipes/:recipeId', _recipeContr2.default.deleteRecipe).get('/recipes/:recipeId', _recipeContr2.default.getRecipeById).all('/recipes/:recipeId', _authenticator2.default.notImplemented);

// apiV1.get('/users/:userId/recipes',userRecipes);
apiV1.get('/recipes?sort=upvotes&order=descending', _authenticator2.default.notImplemented).all('/recipes?sort=upvotes&order=descending', _authenticator2.default.notImplemented);

apiV1.get('/users/:userId/recipes', _favoriteContr2.default.getFavorites).all('/users/:userId/recipes', _authenticator2.default.notImplemented);

// End point for users to get  favorite recipes 
apiV1.get('/users/:usersId/favorites', _favoriteContr2.default.getFavorites).all('/users/:usersId/favorites', _authenticator2.default.notImplemented);

// Endpoint for adding recipe to users favorites
apiV1.post('/users/:recipeId/favorites', _favoriteContr2.default.setFavorites);
// apiV1.get('/recipes/:recipeId/upvotes', RecipeController.default.upvotes);

// Recipe review and update API endpoints
apiV1.post('/recipes/:recipeId/reviews', _reviewsContr2.default.recipeReview).get('/recipes/:recipeId/reviews', _reviewsContr2.default.getRecipeReview).all('/recipes/:recipeId/reviews', _authenticator2.default.notImplemented);

exports.default = apiV1;