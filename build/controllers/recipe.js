'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validators = require('../middlewares/validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipes = _models2.default.Recipes;
var Users = _models2.default.Users;

// get all recipes in the application
var all = function all(req, res) {
  return Recipes.findAll().then(function (recipes) {
    return res.status(200).json({
      'All recipes': recipes
    });
  });
};

// creating new recipe from response
var create = function create(req, res) {
  return Recipes.create({

    name: (0, _validators.validateStr)(req.body.name, res),
    ingredients: (0, _validators.validateStr)(req.body.ingredient, res),
    descriptions: (0, _validators.validateStr)(req.body.description, res),
    directions: (0, _validators.validateStr)(req.body.direction, res),
    UserId: (0, _validators.validateInt)(req.decoded.id, res)
  }).then(function (recipe) {
    return res.status(200).json({ message: 'Recipe Created!', Recipe: recipe });
  }).catch(function (err) {
    res.status(404).json({ err: err });
  });
};

// gets a single recipe by ID
var getRecipeById = function getRecipeById(req, res) {
  return Recipes.findOne({
    where: {
      id: req.params.recipeId
    }
  }).then(function (recipe) {
    if (!recipe) {
      res.status(400).json({ message: 'Recipe does not exist!' });
    } else {
      res.status(200).json(recipe);
    }
  });
};

/* controller for updating a single recipe */
var updateRecipe = function updateRecipe(req, res) {
  return Recipes.findOne({
    where: {
      id: (0, _validators.validateInt)(req.params.recipeId, res)
    }
  }).then(function (recipe) {
    if (!recipe) {
      res.status(404).json({ message: 'Invalid recipe Id!' });
    } else if (recipe.UserId === (0, _validators.validateInt)(req.decoded.id, res)) {
      recipe.update({
        name: (0, _validators.validateStr)(req.body.name, res),
        ingredients: (0, _validators.validateStr)(req.body.ingredient, res),
        descriptions: (0, _validators.validateStr)(req.body.description, res),
        directions: (0, _validators.validateStr)(req.body.direction, res)
      }).then(function () {
        res.json(200).json({
          message: 'Recipe update Successful',
          updated: recipe
        });
      }, function (err) {
        if (err) {
          res.status(400).json({ message: 'Server Error', Error: err });
        }
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
  return Recipes.findOne({
    where: {
      id: (0, _validators.validateInt)(req.params.recipeId, res)
    }
  }).then(function (recipe) {
    if (recipe.UserId === (0, _validators.validateInt)(req.decoded.id)) {
      recipe.destroy();
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(403).json({ message: 'You are not authorised to delete this recipe!' });
    }
  }).catch(function (err) {
    res.status(500).json({ message: 'Server Error', Error: err });
  });
};

exports.default = {
  create: create, all: all, updateRecipe: updateRecipe, deleteRecipe: deleteRecipe, getRecipeById: getRecipeById
};