'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipeRreview = exports.deleteRecipe = exports.updateRecipe = exports.filter = exports.all = exports.create = undefined;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipes = _models2.default.Recipes;
var Users = _models2.default.Users;
var Votes = _models2.default.Votes;

// creating new recipe from response
var create = function create(req, res) {
  var rName = req.body.name;
  var rIngredients = req.body.ingredient;
  var rDescription = req.body.description;
  var rDirection = req.body.direction;
  var author = req.session.userId;

  if (!rName && !rIngredients) {
    return res.status(406).json({ message: 'Recipe name & ingredients must not be empty' });
  }
  if (!author) {
    return res.status(203).json({ message: 'Recipe cannot be created, Invalid User' });
  }

  return Recipes.create({

    name: rName,
    ingredients: rIngredients,
    descriptions: rDescription,
    directions: rDirection,
    UserId: author

  }).then(function (recipe) {
    return res.json({ message: 'Recipe Created!' });
  }).catch(function (err) {
    res.status(404).send(err);
  });
};

// get all recipes in the application
var all = function all(req, res) {
  return Recipes.findAll().then(function (recipes) {
    return res.status(200).json(recipes);
  });
};

// Allows user to post a review on a recipe
var RecipeRreview = function RecipeRreview(req, res) {
  return Recipes.findOne({
    where: {
      id: parseInt(req.params.recipeId)
    }
  }).then(function (recipe) {
    // checks if content is empty
    if (!(req.body.content === '')) {
      Reviews.create({
        title: req.body.title,
        content: req.body.content,
        reviewer: reviewName,
        UserId: req.session.userId
      }).then(function (review) {
        res.status(200).json({ message: 'Review updated successfully' });
      });
    } else {
      res.status(401).json({ message: 'content must not be empty' });
    }
  }).catch(function (err) {
    res.status.json({ message: 'Server Error' });
  });
};

// Sorts recipes according to parameter provided
// in  the URL
var filter = function filter(req, res) {
  var sortBy = req.params.sort;
  var sortOrder = req.params.order;
  if (sortOrder === 'ascending') {
    return Recipes.findAll({
      order: [[Votes, 'upVotes', 'ASC']]
    });
  }

  return Recipes.findAll({
    order: [[Votes, 'downVotes', 'ASC']]
  });
};

var updateRecipe = function updateRecipe(req, res) {
  var userid = req.session.userId;
  var recipeId = req.params.recipeId.recipeId;

  var rName = req.body.name;
  var rIngredients = req.body.ingredient;
  var rDescription = req.body.description;
  var rDirection = req.body.direction;

  return Recipes.findOne({
    where: {
      id: recipeId
    }
  }).then(function (recipe) {
    if (!recipe) {
      res.status(404).json({ message: 'Invalid recipe Id!' });
    } else if (recipe.UserId === parseInt(userid)) {
      recipe.update({
        name: rName,
        ingredients: rIngredients,
        descriptions: rDescription,
        directions: rDirection
      }).then(function (recipe) {
        res.json(201).json({
          message: 'Recipe update Successful',
          updated: recipe
        });
      }).catch(function (err) {
        res.status(500).json({ message: 'Update Unsuccessful!', error: err });
      });
    } else {
      res.status(401).json({ message: 'User is not authorized to update this recipe!' });
    }
  });
};

// controller for deleting recipe by recipeId
var deleteRecipe = function deleteRecipe(req, res) {
  var recipeId = req.params.recipeId.recipeId;

  return Recipes.findOne({
    where: {
      id: recipeId
    }
  }).then(function (recipe) {
    if (recipe.get('UserId') === parseInt(req.session.userId)) {
      recipe.destroy();
      res.status(204).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(401).json({ message: 'You are not authorised to delete this recipe!' });
      console.log(recipe.get('UserId'));
    }
  }).catch(function (err) {
    res.status(501).json({ message: 'Server Error', Error: err });
  });
};
exports.create = create;
exports.all = all;
exports.filter = filter;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
exports.RecipeRreview = RecipeRreview;