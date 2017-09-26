'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorites = _models2.default.Favorites,
    Recipes = _models2.default.Recipes,
    Users = _models2.default.Users;

// handles GET​ : /api/users/<userId>/recipes
// controller for getting users favorietes
var findRecipesById = function findRecipesById(favorites) {
  var recipes = [];
  if (favorites.length < 0) {
    return 'User has no favorite recipes';
  }

  favorites.forEach(function (id) {
    Recipes.findById(parseInt(id, 10)).then(function (recipe) {
      if (recipe) {
        recipes.push('recipe not found');
      } else {
        recipes.push('not found');
      }
    });
  });

  return recipes;
};

var FavoriteController = {
  getUserFavorites: function getUserFavorites(req, res) {
    Favorites.findAll({
      where: {
        UserId: req.params.usersId
      },
      attributes: [],
      include: [{
        model: Recipes
      }]
    }).then(function (favorites) {
      if (favorites.length < 1) {
        res.status(404).json({ message: 'User has no favorites' });
      } else {
        res.status(200).json({ 'User favorites': favorites });
      }
    }).catch(function (Errors) {
      return res.status(500).json({ Errors: Errors });
    });
  },
  getFavorites: function getFavorites(req, res) {
    Favorites.findAll({
      where: { UserId: req.params.usersId },
      include: [Recipes]
    }).then(function (favorites) {
      if (favorites.length < 1) {
        return res.status(404).json({ message: 'User does not have any favorites' });
      }

      res.status(200).json({ message: 'User ' + req.params.usersId, Recipes: favorites });
    }).catch(function (errors) {
      res.status(400).json({ message: 'Request was not processed', errors: errors });
    });
  },


  // Sets favorites for a user when given a recipe id
  setFavorites: function setFavorites(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(404).json({ message: 'No recipe with that id exists' });
    }

    return Favorites.findAll({
      where: {
        RecipeId: req.params.recipeId
      }
    }).then(function (recipe) {
      if (recipe.length > 0) {
        return res.status(403).json({ message: 'Recipe already in favorites' });
      }

      Favorites.create({
        favorite: req.body.favorite,
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }).then(function () {
        res.status(200).json({ message: 'Recipe Successfully added to favorites' });
      });
    }).catch(function (err) {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({ message: 'recipe with the provided id does not exist' });
      }
      res.status(500).json({ message: 'Request was not be Processed', Error: err });
    });
  },
  removeRecipeFromFavorites: function removeRecipeFromFavorites(req, res) {
    Favorites.findOne({
      where: {
        RecipeId: req.params.recipeId
      }
    }).then(function (recipe) {
      if (!recipe) {
        res.status(404).json({ message: 'Recipe with this id is not in favorites' });
      } else {
        recipe.destroy();
        res.status(200).json({ message: 'recipe successfully removed from favorites' });
      }
    }).catch(function (errors) {
      return res.status(500).json({ errors: errors });
    });
  }
};

exports.default = FavoriteController;