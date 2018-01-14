import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import models from '../models';
import app from '../app';

const { Users } = models;


/**
 * @description signs up user
 * @param {object} req - Express http request
 * @param {object} res - Express http response
 * @returns {object} Http response
 */
export const signup = (req, res) => Users.findAll({
  where: {
    $or: [{ email: req.body.email }, { username: req.body.username }]
  },
})
  .then((users) => {
    // checks if the user is already in the databse
    if (users.length > 0) {
      return res.status(409).json({
        status: 'failed',
        message: 'User with Email or Username already exists'
      });
    } // creates new user
    if (req.body.password !== req.body.verifyPassword) {
      return res.status(409).json({
        status: 'failed',
        message: 'Password did not match'
      });
    }
    return Users.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      aboutme: req.body.aboutme,
      email: req.body.email,
    })
      .then((user) => {
        const token = jwt.sign({
          id: user.id,
          user: user.username
        }, app.get('secret_key'), { expiresIn: '1d' });

        res.status(201).json({
          status: 'success',
          message: 'Account Successfully created!',
          token,
          userData: {
            username: user.username
          }
        });
      })
      .catch(() => res.status(500).json({
        status: 'failed',
        message: 'Server Error'
      }));
  });

/**
 * @description signs / logs users into application
 * @param {object} req - Express http request
 * @param {object} res - Express http response
 * @returns {object} Http response
 */
export const signin = (req, res) => Users.findOne({
  where: {
    $or: {
      email: req.body.email.toLowerCase(),
      username: req.body.username
    }
  },
  attributes: ['id', 'username', 'password'],
})
  .then((user) => {
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User does not exist'
      });
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(403).json({
        status: 'failed',
        message: 'Password Incorrect'
      });
    }
    const token = jwt.sign({
      id: user.id,
      user: user.username
    }, app.get('secret_key'), { expiresIn: '1d' });

    return res.status(200).json({
      status: 'success',
      message: 'Login Successful!',
      token,
      userData: {
        id: user.id,
        username: user.username
      },
    });
  })
  .catch(() => res.status(500).json({
    status: 'failed',
    message: 'Server Error',
  }));

/**
 * @description gets single user profile details
 * @param {object} req
 * @param {object} res
 * @returns {object} Http response
 */
export const userProfile = (req, res) => Users.findOne({
  where: {
    id: req.decoded.id
  },
}).then(user => res.status(200).json(user))
  .catch(err => res.status(500).json(err));

/**
 * @description updates user profile
 * @param {object} req - Express http request
 * @param {object} res - Express http response
 * @returns {object} Http response
 */
export const updateProfile = (req, res) => Users.findOne({
  where: {
    id: req.decoded.id
  }
}).then((user) => {
  user.update({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    aboutme: req.body.aboutme,
    photo: req.body.photo,
  }).then(() => res.status(201).json({
    status: 'success',
    message: 'Profile Update Successful',
    userData: user
  }));
}).catch(() => res.status(500).json({
  status: 'failed',
  message: 'Server Error'
}));

