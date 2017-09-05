'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = exports.apiRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _recipeController = require('../controllers/recipeController');

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRouter = _express2.default.Router();

// Routes for API navigation
apiRouter.post('/users/signup', _userController.signup);
apiRouter.post('/users/signin', _userController.signin);
apiRouter.get('/recipes', _recipeController.all);
apiRouter.put('/recipes/:recipeId', _recipeController.updateRecipe);
apiRouter.delete('/recipes/:recipeId', _recipeController.deleteRecipe);
apiRouter.post('/recipes', _recipeController.create);
// apiRouter.get('/users/:userId/recipes',userRecipes);
apiRouter.get('recipes?sort=upvotes&order=ascending', _recipeController.filter);
// apiRouter.get('/user/:userId/favorites',userFavorites);
// apiRouter.post('/user/:recipeId/favorites',userFavorites);
// apiRouter.get('/recipes/:recipeId/upvotes', recipeController.upvotes);
apiRouter.get('/recipes/recipeId/reviews', _recipeController.RecipeRreview);

var isLoggedIn = function isLoggedIn(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    _app.jwt.verify(token, _app.app.get('secret_key'), function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed!' });
      }
      res.status(200).json({ message: 'Authentication Successful!' });
      req.decoded = decoded;
      next();
    });
  }
  // if (req.url === '/users/signin' || req.url === '/users/signup'){
  //   next();
  // }

  else {
      res.status(403).json({ message: 'failed! No token.' });
    }
};

exports.apiRouter = apiRouter;
exports.isLoggedIn = isLoggedIn;