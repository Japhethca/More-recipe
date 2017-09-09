'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _models2.default.Users.Users;


var signinRules = {
  email: 'string|required',
  password: 'required|min:5'
};

var signupRules = {
  firstname: 'required|string|min:3',
  lastname: 'required|string|min:3',
  username: 'required|string|min:3',
  email: 'required|email',
  password: 'required|min:5'
};

// A controller that accepts user details
// and creates a new user in the database
var UserController = {
  signup: function signup(req, res) {
    var validate = new _validatorjs2.default(req.body, signupRules);
    if (validate.passes()) {
      return Users.findAll({
        where: {
          email: req.body.email
        }
      }).then(function (users) {
        // checks if the user is already in the databse
        if (users.length > 0) {
          return res.status(400).json({
            message: 'User already exists'
          });
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
    }

    res.status(400).json({ message: validate.errors });
  },


  // Use login details of otther users
  signin: function signin(req, res) {
    var signinValidator = new _validatorjs2.default(req.body, signinRules);
    if (signinValidator.passes()) {
      return Users.findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      }).then(function (user) {
        console.log(user);
        if (!user) {
          return res.status(400).json({ message: 'User does not exist' });
        }

        var token = _jsonwebtoken2.default.sign({ id: user.id }, _app2.default.get('secret_key'), { expiresIn: 84000 });
        res.status(200).json({ message: 'Login Successful!', 'User detail': user, Token: token });
      }).catch(function (err) {
        return res.status(500).json({
          message: 'Request could not be Processed',
          Error: err.name
        });
      });
    }

    res.status(400).json({ message: signinValidator.errors });
  },


  // return all users in the database
  users: function users(req, res) {
    return Users.findAll().then(function (users) {
      res.status(200).json(users);
    }).catch(function (err) {
      return res.status.json({ Message: 'An arror Occured', Error: err });
    });
  }
};

exports.default = UserController;