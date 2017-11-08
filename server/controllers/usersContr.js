import validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';
import app from '../app';

const Users = models.Users;

// for password encryption
const saltRound = 10;

// validation rules
const signinRules = {
  email: 'required|email',
  password: 'required|min:5',
};

const signupRules = {
  firstname: 'required|string|min:3',
  lastname: 'required|string|min:3',
  username: 'required|string|min:3',
  email: 'required|email',
  password: 'required|min:5',
  verifyPassword: 'required|min:5',
};


/** A controller that accepts user details
 *  and creates a new user in the database
 */
const UserController = {
  signup(req, res) {
    const validate = new validator(req.body, signupRules);

    if (validate.passes()) {
      return Users.findAll({
        where: {
          email: req.body.email,
        },
      })
        .then((users) => {
          // checks if the user is already in the databse
          if (users.length > 0) {
            return res.status(400).json({
              message: 'User already exists'
            });
          } // creates new user
          if (req.body.password !== req.body.verifyPassword) {
            return res.status(400).json({ message: 'password did not match' });
          }
          const myPassword = bcrypt.hashSync(req.body.password, saltRound);
          return Users.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: myPassword,
            aboutme: req.body.aboutme,
            email: req.body.email,
          })
            .then(user => res.status(200).json({
              message: 'Account Successfully created!', 'User  details': user,
            }))
            .catch(err => res.status(500).json({ message: 'Server Error', Error: err }));
        });
    }
    const errors = Object.values(validate.errors.errors).map(val => val[0]);
    res.status(400).json({ message: errors });
  },


  // Use login details of otther users
  signin(req, res) {
    const signinValidator = new validator(req.body, signinRules);
    if (signinValidator.passes()) {
      return Users.findOne({
        where: {
          email: req.body.email
        },
      })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
          } else if (!bcrypt.compareSync(req.body.password, user.get('password'))) {
            res.status(403).json({ message: 'Password Incorrect' });
          }
          const token = jwt.sign({ id: user.id, user: user.email }, app.get('secret_key'), { expiresIn: 84000 });
          res.status(200).json({ message: 'Login Successful!', 'User detail': user, Token: token });
        })
        .catch(err => res.status(500).json({
          message: 'Request could not be Processed',
          err
        }));
    }
    const errors = Object.values(signinValidator.errors.errors).map(val => val[0]);
    res.status(400).json({ message: errors });
  },


  // return all users in the database
  user(req, res) {
    return Users.findOne({
      where: {
        id: req.params.userId
      },
      attributes: ['id', 'username', 'email', 'firstname', 'lastname']
    }).then((user) => {
      if (!user) {
        res.status(404).json({ message: 'user does not exist' });
      }
      res.status(200).json(user);
    }).catch(err => res.status(500).json({ Message: 'An arror Occured', Error: err }));
  },

  userProfile(req, res) {
    if (!req.decoded.id) {
      res.status(403).json({ message: 'You are not allowed to view this page' });
    }
    return Users.findOne({
      where: {
        id: req.decoded.id
      },
    }).then(user => res.status(200).json(user))
      .catch(err => res.status(500).json(err));
  },


  updateProfile(req, res) {
    if (!req.decoded.id) {
      res.status(403).json({ message: 'Invalid request' });
    }
    if (req.body.newPassword && req.body.password === req.body.newPassword) {
      res.status(400).json({ message: 'password Must Differ' });
    }
    Users.findOne({
      where: {
        email: req.decoded.user
      }
    }).then((user) => {
      const newPassword = req.body.newPassword ? bcrypt.hashSync(req.body.newPassword, saltRound) : '';
      user.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: newPassword || req.body.password,
        aboutme: req.body.aboutme,
        photo: req.body.photo,
      }).then(() => res.status(200).json({ message: 'Profile Update Successful', profile: user }));
    }).catch(err => res.status(500).json({ Error: err }));
  }
};

export default UserController;
