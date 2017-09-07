'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFavorites = exports.getFavorites = undefined;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validators = require('../middlewares/validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorites = _models2.default.Favorites;
var Users = _models2.default.Users;
var Recipe = _models2.default.Recipes;

// handles GET​ : /api/users/<userId>/recipes
// controller for getting users favorietes

var getFavorites = function getFavorites(req, res) {
  return Favorites.findAll({
    where: {
      userId: (0, _validators.validateInt)(req.params.userId, res)
    }
  }).then(function (favorites) {
    if (!favorites) {
      return res.status(404).json({ message: 'User has no Favorites' });
    }res.status(200).json({
      message: 'Favorites'
    });
  }).catch(function (err) {
    res.status(403).json({
      Error: true
    });
  });
};

// Sets favorites for a user when given a recipe id
var setFavorites = function setFavorites(req, res) {
  Favorites.create({
    title: (0, _validators.validateStr)(req.body.title, res),
    content: (0, _validators.validateStr)(req.body.content, res),
    userId: req.decode.id,
    RecipeId: (0, _validators.validateInt)(res.params.recipeId, res)
  }).then(function (favorite) {
    if (!favorite) {
      res.status(401).json({ message: 'Favorites not add', Error: true });
    }
  }).catch(function (err) {
    if (err) {
      res.status(400).json({ Error: true });
    }
  });
};

exports.getFavorites = getFavorites;
exports.setFavorites = setFavorites;