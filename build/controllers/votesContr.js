'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Votes = _models2.default.Votes,
    Users = _models2.default.Users,
    Recipes = _models2.default.Recipes;

// controllers for handling voting in application
var VotingController = {
  // controller for handling upvotes
  upVotes: function upVotes(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(403).json({ message: 'Recipe id does not exist' });
    }
    // finds all votes that matches the given user and recipe id
    Votes.findAll({
      where: {
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }
    }).then(function (vote) {
      // if vote is found
      if (vote.length > 0) {
        return res.status(403).json({ message: 'Already upvoted recipe' });
      } // find a single recipe by id
    }).then(function () {
      return Recipes.findById(req.params.recipeId);
    }).then(function (recipe) {
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe does not exist!' });
      } // create a new vote if user has not voted before
      Votes.create({
        vote: 1,
        RecipeId: req.params.recipeId,
        UserId: req.decoded.id
      });
      // adds a new vote to the recipe
      recipe.increment('upVotes');
      res.status(200).json({ message: 'Recipe upvoted Successfully', Recipe: recipe });
    }).catch(function (err) {
      res.status(400).json({ message: err.name });
    });
  },

  // controller for handling downvotes in application
  downVote: function downVote(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(403).json({ message: 'Recipe id does not exist' });
    }
    Votes.findAll({
      where: {
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }
    }).then(function (vote) {
      if (vote.length > 0) {
        return res.status(403).json({ message: 'Already upvoted recipe' });
      }
    }).then(function () {
      return Recipes.findById(req.params.recipeId);
    }).then(function (recipe) {
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe does not exist!' });
      }
      Votes.create({
        vote: 0,
        RecipeId: req.params.recipeId,
        UserId: req.decoded.id

      });
      recipe.increment('downVotes');
      res.status(200).json({ message: 'Recipe downvoted Successfully', Recipe: recipe });
    }).catch(function (err) {
      res.status(400).json({ message: err });
    });
  }
};

exports.default = VotingController;