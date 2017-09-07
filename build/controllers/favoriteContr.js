'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { isValidInt, isValidStr } from '../middlewares/validators';

var Favorites = _models2.default.Favorites;
var Users = _models2.default.Users;
var Recipe = _models2.default.Recipes;

// handles GET​ : /api/users/<userId>/recipes
// controller for getting users favorietes

var FavoriteController = {
  getFavorites: function getFavorites(req, res) {
    Favorites.findAll({
      where: {
        UserId: req.params.usersId
      }
    }).then(function (favorites) {
      if (!(favorites.length > 0)) {
        return res.status(404).json({ message: 'User has no Favorites' });
      }
      res.status(200).json({
        message: 'Your favorites',
        Favorites: favorites
      });
    }).catch(function (err) {
      res.status(403).json({
        Error: true
      });
    });
  },


  // Sets favorites for a user when given a recipe id
  setFavorites: function setFavorites(req, res) {
    return Favorites.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.decode.id,
      RecipeId: res.params.recipeId
    }).then(function (favorite) {
      if (!favorite) {
        res.status(401).json({ message: 'Favorites not added', Error: true });
      }
    }).catch(function (err) {
      if (err) {
        res.status(400).json({ Error: true });
      }
    });
  }
};

exports.default = FavoriteController;