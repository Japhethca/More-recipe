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
var idRules = {
  recipeId: 'integer',
  userId: 'interger,'
};

var VotingController = {
  upVotes: function upVotes(req, res) {
    var idValidator = new _validatorjs2.default(req.body, idRules);
    if (idValidator.passes()) {
      return Recipes.findOne({
        where: {
          id: recipeId
        }
      }).then(function (recipe) {
        if (Object.getOwnPropertyNames(recipe).length === 0) {
          return res.status(404).json({ message: 'Recipe does not exist!' });
        }
        recipe.increment('upVotes');
        res.status(200).json({ message: 'Recipe updated Successfully' });
      }).catch(function (err) {
        res.status(400).json({ message: err });
      });
    } else {
      res.status(400).json({ message: 'Error' });
    }
  },
  downVote: function downVote(req, res) {
    var idValidator = new _validatorjs2.default(req.body, idRules);
    if (idValidator.passes()) {
      return Recipes.findOne({
        where: {
          id: recipeId
        }
      }).then(function (recipe) {
        if (Object.getOwnPropertyNames(recipe).length === 0) {
          return res.status(404).json({ message: 'Recipe does not exist!' });
        }
        recipe.increment('downVotes');
        res.status(200).json({ message: 'Recipe updated Successfully' });
      }).catch(function (err) {
        res.status(400).json({ message: err });
      });
    } else {
      res.status(400).json({ message: 'Error' });
    }
  }
};

exports.default = VotingController;