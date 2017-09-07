'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = exports.recipeReview = exports.getRecipeReview = undefined;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validators = require('../middlewares/validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorites = _models2.default.Favorites;
var Users = _models2.default.Users;
var Recipe = _models2.default.Recipes;

var recipeReview = function recipeReview(req, res) {
  return Recipes.findOne({
    where: {
      id: req.params.recipeId
    }
  }).then(function (recipe) {
    if (!recipe) {
      return res.status(400).json(req.param);
    }
  });
};

var getRecipeReview = function getRecipeReview(req, res) {
  return Reviews.findAll({
    where: {
      RecipeId: req.params.recipeId
    }
  }).then(function (reviews) {
    if (!reviews) {
      res.status(404).json({ message: 'Invalid Recipe Id' });
    } else {
      res.status(200).json({ message: 'Recipe Reviews', Reviews: reviews });
    }
  }, function (err) {
    if (err) {
      res.status(500).json({ message: 'Cannot Request', Error: err });
    }
  }).catch(function (err) {
    res.json(500).json({ message: 'Server', Error: err });
  });
};

// Sorts recipes according to parameter provided
// in  the URL
var filter = function filter(req, res) {
  var sortBy = req.params.sort;
  var sortOrder = req.params.order;
  if (sortOrder === 'ascending') {
    // let sort = {ascending: '', descending}
    return Recipes.findAll({
      order: [[Votes, 'upVotes', 'ASC']]
    });
  }

  return Recipes.findAll({
    order: [[Votes, 'downVotes', 'ASC']]
  });
};

exports.getRecipeReview = getRecipeReview;
exports.recipeReview = recipeReview;
exports.filter = filter;