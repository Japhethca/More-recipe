'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorites = _models2.default.Favorites,
    Recipes = _models2.default.Recipes;

// handles GET​ : /api/users/<userId>/recipes
// controller for getting users favorietes
var FavoriteController = {
  getFavorites: function getFavorites(req, res) {
    Favorites.findAll({
      where: { UserId: req.params.usersId },
      include: [Recipes]
    }).then(function (favorites) {
      if (favorites.length < 1) {
        return res.status(404).json({ message: 'User does not have any favorites' });
      }
      res.status(200).json({ message: 'User ' + req.params.usersId, Recipes: favorites });
    }).catch(function (err) {
      res.status(400).json({ message: 'Request was not processed' });
    });
  },


  // Sets favorites for a user when given a recipe id
  setFavorites: function setFavorites(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(404).json({ message: 'No recipe with that id exists' });
    }
    return Favorites.create({
      favorite: req.body.favorite,
      UserId: req.decoded.id,
      RecipeId: req.params.recipeId
    }).then(function () {
      res.status(200).json({ message: 'Recipe Successfully added to favorites' });
    }).catch(function (err) {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({ message: 'recipe with the provided id does not exist' });
      }
      res.status(500).json({ message: 'Request was not be Processed', Error: err });
    });
  }
};

exports.default = FavoriteController;