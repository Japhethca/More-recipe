import validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import models from '../models';
import app from '../app';


const Users = models.Users;

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


// A controller that accepts user details
// and creates a new user in the database
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
          return Users.create({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            userName: req.body.username,
            password: req.body.password,
            aboutMe: req.body.aboutme,
            email: req.body.email,
          })
            .then(user => res.status(200).json({
              message: 'Account Successfully created!', 'User  details': user,
            })
              .catch(err => res.status(500).json({ message: 'Server Error', Error: err })));
        });
    }

    res.status(400).json({ message: validate.errors.errors });
  },


  // Use login details of otther users
  signin(req, res) {
    const signinValidator = new validator(req.body, signinRules);
    if (signinValidator.passes()) {
      return Users.findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
          }

          const token = jwt.sign({ id: user.id, user: user.email }, app.get('secret_key'), { expiresIn: 84000 });
          res.status(200).json({ message: 'Login Successful!', 'User detail': user, Token: token });
        })
        .catch(err => res.status(500).json({
          message: 'Request could not be Processed',
          Error: err.name
        }));
    }

    res.status(400).json({ message: signinValidator.errors.errors });
  },


  // return all users in the database
  users(req, res) {
    return Users.findAll().then((users) => {
      res.status(200).json(users);
    }).catch(err => res.status.json({ Message: 'An arror Occured', Error: err }));
  },
};

export default UserController;
