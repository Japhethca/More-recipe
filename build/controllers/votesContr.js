'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Votes = _models2.default.Votes,
    Users = _models2.default.Users,
    Recipes = _models2.default.Recipes;

// controllers for handling voting in application
// this file contains fuctions for controlling recipe voting
// Both upvotes and downvotes
var VotingController = {
  // controller for handling upvotes
  upVotes: function upVotes(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(403).json({ message: 'Recipe id does not exist' });
    }
    // finds all votes that matches the given user and recipe id
    Votes.findOne({
      where: {
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }
    }).then(function (vote) {
      // if vote is found
      if (vote) {
        var upvoted = vote.get('vote');
        // if recipe has been upvoted
        // upvote if recipe has been downvoted before
        Recipes.findById(req.params.recipeId).then(function (recipe) {
          if (!recipe) {
            res.status(404).json({ message: 'No such recipe exists' });
          } else if (recipe) {
            if (upvoted === 1) {
              recipe.decrement('upVotes');
              vote.destroy();
              res.status(200).json({ message: 'Recipe Unvoted', Recipe: recipe });
            } else if (upvoted === 0) {
              recipe.increment('upVotes');
              recipe.decrement('downVotes');
              vote.update({ vote: 1 });
              res.status(200).json({ message: 'Recipe Upvoted', Recipe: recipe });
            }
          }
        });
      } else {
        // if recipe has not been voted by user
        // find recipe and increment its upvotes field
        Recipes.findById(req.params.recipeId).then(function (recipe) {
          if (!recipe) {
            return res.status(404).json({ message: 'Recipe does not exist!' });
          } // create a new vote if user has not voted before
          Votes.create({
            vote: 1,
            RecipeId: req.params.recipeId,
            UserId: req.decoded.id
          });
          recipe.increment('upVotes');
          res.status(200).json({ message: 'Recipe Upvoted', Recipe: recipe });
        });
      }
      // find a single recipe by id
    }).catch(function (err) {
      res.status(400).json({ message: err.name });
    });
  },


  // controller for handling downvotes in application
  downVote: function downVote(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(403).json({ message: 'Recipe id does not exist' });
    }
    Votes.findOne({
      where: {
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }
    }).then(function (vote) {
      /* checks if there's any vote found in the db
      * if any is found, return an already exist message
      */
      if (vote) {
        var downvoted = vote.get('vote');
        Recipes.findById(req.params.recipeId).then(function (recipe) {
          if (!recipe) {
            res.status(404).json({ message: 'No such recipe exists' });
          } else if (recipe) {
            if (downvoted === 0) {
              recipe.decrement('downVotes');
              vote.destroy();
              res.status(200).json({ message: 'Recipe Unvoted', Recipe: recipe });
            } else if (downvoted === 1) {
              recipe.increment('downVotes');
              recipe.decrement('upVotes');
              vote.update({ vote: 0 });
              res.status(200).json({ message: 'Recipe Downvoted', Recipe: recipe });
            }
          }
        });
      } else {
        // if recipe has not been voted by user
        // find recipe and increment its upvotes field
        Recipes.findById(req.params.recipeId).then(function (recipe) {
          if (!recipe) {
            return res.status(404).json({ message: 'Recipe does not exist!' });
          } // create a new vote if user has not voted before
          Votes.create({
            vote: 1,
            RecipeId: req.params.recipeId,
            UserId: req.decoded.id
          });
          recipe.increment('upVotes');
          res.status(200).json({ message: 'Recipe Downvoted', Recipe: recipe });
        });
      }
      // find a single recipe by id
    }).catch(function (err) {
      res.status(400).json({ message: err.name });
    });
  }
};

exports.default = VotingController;