'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipes = _models2.default.Recipes;
var Users = _models2.default.Users;
var Votes = _models2.default.Votes;
var Reviews = _models2.default.Reviews;

// creating new recipe from response
var create = function create(req, res) {
  var rName = req.body.name;
  var rIngredients = req.body.ingredient;
  var rDescription = req.body.description;
  var rDirection = req.body.direction;
  var author = req.decoded.id;

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
    return res.json({ message: 'Recipe Created!', Recipe: recipe });
  }).catch(function (err) {
    res.status(404).json({ err: err });
  });
};

// get all recipes in the application
var all = function all(req, res) {
  return Recipes.findAll().then(function (recipes) {
    return res.status(200).json({
      'All recipes': recipes
    });
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
// Allows user to post a review on a recipe
/* const recipeReview = (req, res) => Recipes.findOne({ where: { id: req.params.recipeId } })
  .then((recipe) => {
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe Does not exist!' });
    }
    return Reviews.create({
      title: res.body.title,
      content: req.body.content,
      RecipeId: req.params.id,
      UserId: req.decoded.id,
    }).then((review) => { res.status(201).json(review); })
      .catch(err => res.status(500).json({ message: 'Server Error', Error: err.name }));
  }).catch(err => res.status(500).json(err.name));
 */
// Controller for getting the review of a single recipe by its id
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

/* controller for updating a single recipe */
var updateRecipe = function updateRecipe(req, res) {
  var userid = req.decoded.id;
  var recipeId = req.params.recipeId;
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
    } else if (recipe.UserId === parseInt(userid, 10)) {
      recipe.update({
        name: rName,
        ingredients: rIngredients,
        descriptions: rDescription,
        directions: rDirection
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
      id: req.params.recipeId
    }
  }).then(function (recipe) {
    if (recipe.UserId === req.decoded.id) {
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
  create: create, all: all, filter: filter, updateRecipe: updateRecipe, deleteRecipe: deleteRecipe, recipeReview: recipeReview, getRecipeReview: getRecipeReview, getRecipeById: getRecipeById
};