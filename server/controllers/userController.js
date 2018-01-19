import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import models from '../models';
import app from '../app';

const { Users } = models;


/**
 * @description signs up user
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @returns {object} Http response
 */
export const signup = (request, response) => Users.findAll({
  where: {
    $or: [
      { email: request.body.email },
      { username: request.body.username }
    ]
  },
})
  .then((users) => {
    // checks if the user is already in the databse
    if (users.length > 0) {
      return response.status(409).json({
        status: 'failed',
        message: 'User with Email or Username already exists'
      });
    } // creates new user
    if (request.body.password !== request.body.verifyPassword) {
      return response.status(403).json({
        status: 'failed',
        message: 'Password did not match'
      });
    }
    return Users.create({
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      username: request.body.username,
      password: request.body.password,
      aboutme: request.body.aboutme,
      email: request.body.email,
    })
      .then((user) => {
        const token = jwt.sign({
          id: user.id,
          user: user.username
        }, app.get('secret_key'), { expiresIn: '1d' });

        response.status(201).json({
          status: 'success',
          message: 'Account Successfully created!',
          token,
          userData: {
            username: user.username
          }
        });
      })
      .catch(() => response.status(500).json({
        status: 'failed',
        message: 'Server Error'
      }));
  });

/**
 * @description signs / logs users into application
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @returns {object} Http response
 */
export const signin = (request, response) => Users.findOne({
  where: {
    $or: {
      email: request.body.email,
      username: request.body.username
    }
  },
  attributes: ['id', 'username', 'password'],
})
  .then((user) => {
    if (!user) {
      return response.status(404).json({
        status: 'failed',
        message: 'User does not exist'
      });
    } else if (!bcrypt.compareSync(request.body.password, user.password)) {
      return response.status(403).json({
        status: 'failed',
        message: 'Password Incorrect'
      });
    }
    const token = jwt.sign({
      id: user.id,
      user: user.username
    }, app.get('secret_key'), { expiresIn: '1d' });

    return response.status(200).json({
      status: 'success',
      message: 'Login Successful!',
      token,
      userData: {
        id: user.id,
        username: user.username
      },
    });
  })
  .catch(() => response.status(500).json({
    status: 'failed',
    message: 'Server Error',
  }));

/**
 * @description gets single user profile details
 * @param {object} request
 * @param {object} response
 * @returns {object} Http response
 */
export const userProfile = (request, response) => Users.findOne({
  where: {
    id: request.decoded.id
  },
}).then(user => response.status(200).json(user))
  .catch(err => response.status(500).json(err));

/**
 * @description updates user profile
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @returns {object} Http response
 */
export const updateProfile = (request, response) => Users.findOne({
  where: {
    id: request.decoded.id
  }
}).then((user) => {
  user.update({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    aboutme: request.body.aboutme,
    photo: request.body.photo,
  }).then(() => response.status(201).json({
    status: 'success',
    message: 'Profile Update Successful',
    userData: user
  }));
}).catch(() => response.status(500).json({
  status: 'failed',
  message: 'Server Error'
}));

