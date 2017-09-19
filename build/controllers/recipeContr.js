'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipes = _models2.default.Recipes;
var sequelize = _index2.default.sequelize;

var createRules = {
  name: 'required',
  ingredient: 'required',
  description: 'required',
  direction: 'required'
};

var updateRules = {
  name: 'required',
  ingredient: 'required',
  description: 'required',
  direction: 'required'
};

var RecipeController = {
  // get all recipes in the application
  listUpvotes: function listUpvotes(req, res, next) {
    if (req.query.order && req.query.sort) {
      return sequelize.query('\n      SELECT * FROM "Recipes" AS "Recipes" ORDER BY "upVotes" DESC;', { type: _sequelize2.default.QueryTypes.SELECT }).then(function (recipes) {
        return res.status(200).json({ message: 'All Recipes displayed in Descending order', recipes: recipes });
      }).catch(function (err) {
        return res.status(400).json(err);
      });
    }
    next();
  },


  // controller for returning all recipe in the application
  all: function all(req, res) {
    return Recipes.findAll().then(function (recipes) {
      if (recipes.length > 0) {
        if (req.query) {
          return res.status(200).json({ message: 'All recipes:', List: recipes });
        }
      }
      res.status(404).json({ message: 'No Recipes found' });
    });
  },


  // creating new recipe from response
  createRecipe: function createRecipe(req, res) {
    var recipeValidator = new _validatorjs2.default(req.body, createRules);
    if (recipeValidator.passes()) {
      Recipes.findAll({ where: { name: req.body.title } }).then(function (recipes) {
        if (recipes.length > 0) {
          res.status(400).json({ message: 'Recipe with this name already exists' });
        }
      }).then(function () {
        return Recipes.create({
          name: req.body.name,
          ingredients: req.body.ingredient,
          directions: req.body.direction,
          descriptions: req.body.description,
          UserId: req.decoded.id
        });
      }).then(function (recipe) {
        res.status(200).json({ message: 'Recipe successfully created', Details: recipe });
      }).catch(function () {
        res.status(400).json({ message: 'Request was not processed' });
      });
    } else {
      res.status(403).json(recipeValidator.errors);
    }
  },


  // gets a single recipe by ID
  getRecipeById: function getRecipeById(req, res) {
    Recipes.findOne({
      where: {
        id: req.params.recipeId
      }
    }).then(function (recipe) {
      if (!recipe) {
        return res.status(400).json({ message: 'Recipe does not exist!' });
      }
      res.status(200).json(recipe);
    });
  },


  /* controller for updating a single recipe */
  updateRecipe: function updateRecipe(req, res) {
    var validateValues = new _validatorjs2.default(req.body, updateRules);
    // all the values are valid
    if (validateValues.passes()) {
      return Recipes.findOne({
        where: {
          id: req.params.recipeId
        }
      }).then(function (recipe) {
        if (!recipe) {
          res.status(404).json({ message: 'Recipe does not exist' });
        } else if (recipe.UserId === req.decoded.id) {
          recipe.update({
            name: req.body.name,
            ingredients: req.body.ingredient,
            descriptions: req.body.description,
            directions: req.body.direction
          }).then(function () {
            res.json(200).json({
              message: 'Recipe update Successful',
              updated: recipe
            });
          }).catch(function (err) {
            res.status(500).json({ message: 'Update Unsuccessful!', error: err });
          });
        } else {
          res.status(403).json({ message: 'User is not authorized to update this recipe!' });
        }
      }).catch(function (err) {
        res.status(400).json({
          message: 'Request cannot be processed',
          Error: err
        });
      });
    }

    res.status(403).json(validateValues.errors);
  },


  // controller for deleting recipe by recipeId
  deleteRecipe: function deleteRecipe(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(400).json({ message: 'Recipe Id cannot be less than 1' });
    }
    Recipes.findOne({
      where: {
        id: req.params.recipeId
      }
    }).then(function (recipe) {
      if (recipe == null || recipe.length < 0) {
        res.status(404).json({ message: 'Cannot delete recipe, does not exist' });
      }
      if (recipe.UserId === req.decoded.id) {
        recipe.destroy();
        res.status(200).json({ message: 'Recipe deleted successfully' });
      } else {
        res.status(403).json({ message: 'You are not authorised to delete this recipe!' });
      }
    }).catch(function (err) {
      res.status(500).json({ message: 'Server Error', Error: err });
    });
  }
};

exports.default = RecipeController;