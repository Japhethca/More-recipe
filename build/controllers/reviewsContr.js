'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// models import statement
var Users = _models2.default.Users.Users,
    Recipes = _models2.default.Recipes.Recipes,
    Reviews = _models2.default.Reviews.Reviews;


var reviewRules = {
  title: 'required'
};

var ReviewController = {
  recipeReview: function recipeReview(req, res) {
    return Recipes.findOne({
      where: {
        id: req.params.recipeId
      }
    }).then(function (recipe) {
      if (!recipe) {
        return res.status(400).json({ message: 'Invalid recipe Id' });
      }
      Reviews.create({
        title: req.body.title,
        content: req.body.content,
        RecipeId: recipe.id,
        UserId: req.decoded.id
      }).then(function (review) {
        res.status(200).json({
          message: 'Review Created',
          Recipe: recipe,
          Review: review
        });
      }).catch(function (err) {
        res.status(400).Json({
          message: 'Request was not process',
          Error: err
        });
      });
    }).catch(function (err) {
      res.status(400).json({
        message: 'Request was not processed',
        Error: err
      });
    });
  },


  // returns the reviews of a particular recipe
  getRecipeReview: function getRecipeReview(req, res) {
    return Reviews.findAll({
      where: {
        RecipeId: req.params.recipeId
      }
    }).then(function (reviews) {
      if (!(reviews.length > 0)) {
        return res.status(404).json({ message: 'No reviews for this recipe' });
      }
      res.status(200).json({ message: 'Recipe Reviews', 'All Reviews': reviews });
    }).catch(function (err) {
      res.json(400).json({
        message: 'Could not process request',
        Error: err
      });
    });
  }
};

exports.default = ReviewController;