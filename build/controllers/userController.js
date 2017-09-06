'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _models2.default.Users;
var Recipes = _models2.default.Recipes;
var Favorites = _models2.default.Favorites;

// A controller that accepts user details
// and creates a new user in the database
var signup = function signup(req, res) {
  Users.findAll({
    where: {
      email: req.body.email
    }
  }).then(function (users) {
    // checks if the user is already in the databse
    if (users.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    } // creates new user
    return Users.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      userName: req.body.username,
      password: req.body.password,
      aboutMe: req.body.aboutme,
      email: req.body.email
    }).then(function (user) {
      return res.status(200).json({
        message: 'Account Successfully created!', 'User  details': user
      }).catch(function (err) {
        return res.status(500).json({ message: 'Server Error', Error: err });
      });
    });
  });
};

// Use login details of otther users
var signin = function signin(req, res) {
  Users.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    if (!user) {
      res.status(400).json({ message: 'User does not exist' });
    } else if (user) {
      if (req.body.password === user.password) {
        var token = _app.jwt.sign({ id: user.id }, _app.app.get('secret_key'), { expiresIn: 84000 });
        res /* .headers('token', token) */.status(200).json({ message: 'Login Successful!', 'User detail': user });
        res.headers('token', token);
      } else {
        res.status(400).json({ message: 'Login Failed!' });
      }
    }
  }, function (err) {
    if (err) {
      res.status(403).json({ message: 'Invalid request!', Error: err });
    }
  }).catch(function (err) {
    return res.status(500).json({ message: 'Server Error', Error: err });
  });
};

// controller to handle request for user favorites
var getFavorites = function getFavorites(req, res) {
  return Favorites.findAll({
    where: {
      UserId: req.decode.id
    }
  }).then(function (recipes) {
    if (!recipes) {
      res.status(404).json({ message: 'You Don\'t have any Favorite Recipe ' });
    } else {
      res.status(200).json({ message: 'Favorite Recipes:', Recipes: recipes });
    }
  }).catch(function (err) {
    res.status(500).json({ message: 'Server Error', Error: err });
  });
};

// controller for saving a recipe as a favorite
var setFavorites = function setFavorites(req, res) {
  Recipes.findOne({
    where: {
      id: req.params.recipeId
    }
  }).then(function (recipe) {
    if (!recipe) {
      res.status(404).json({ message: 'Recipe does not exist' });
    } else {
      Favorites.create({
        UserId: req.decode.id,
        recipeId: recipe.id
      });
    }
  }, function (err) {
    res.status(500).json({ message: 'Invalid Request', Error: err });
  }).catch(function (err) {
    res.status(500).json({ message: 'Server Error', Error: err });
  });
};
exports.default = {
  signin: signin, signup: signup, setFavorites: setFavorites, getFavorites: getFavorites
};