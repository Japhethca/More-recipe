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

var VotingController = {
  upVote: function upVote(req, res) {},
  downVote: function downVote(req, res) {}
};

exports.default = VotingController;