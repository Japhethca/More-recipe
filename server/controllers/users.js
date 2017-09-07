import models from '../models';
import { jwt, app } from '../app';

const Users = models.Users;
const Recipes = models.Recipes;
const Favorites = models.Favorites;

// A controller that accepts user details
// and creates a new user in the database
const signup = (req, res) => {
  Users.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then((users) => {
      // checks if the user is already in the databse
      if (users.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }// creates new user
      return Users.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        userName: req.body.username,
        password: req.body.password,
        aboutMe: req.body.aboutme,
        email: req.body.email,
      }).then(user => res.status(200).json({
        message: 'Account Successfully created!', 'User  details': user,
      })
        .catch(err => res.status(500).json({ message: 'Server Error', Error: err })));
    });
};


// Use login details of otther users
const signin = (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: 'User does not exist' });
      } else if (user) {
        if (req.body.password === user.password) {
          const token = jwt.sign({ id: user.id }, app.get('secret_key'), { expiresIn: 84000 });
          res.status(200).json({ message: 'Login Successful!', 'User detail': user });
          res.headers('token', token);
        } else {
          res.status(400).json({ message: 'Login Failed!' });
        }
      }
    }, (err) => {
      if (err) {
        res.status(403).json({ message: 'Invalid request!', Error: err });
      }
    }).catch(err => res.status(500).json(({ message: 'Server Error', Error: err })));
};

// controller to handle request for user favorites
const getFavorites = (req, res) => Favorites.findAll({
  where: {
    UserId: req.decode.id,
  },
})
  .then((recipes) => {
    if (!recipes) {
      res.status(404).json({ message: 'You Don\'t have any Favorite Recipe ' });
    } else {
      res.status(200).json({ message: 'Favorite Recipes:', Recipes: recipes });
    }
  })
  .catch((err) => {
    res.status(500).json({ message: 'Server Error', Error: err });
  });

// controller for saving a recipe as a favorite
const setFavorites = (req, res) => {
  Recipes.findOne({
    where: {
      id: req.params.recipeId,
    },
  }).then(
    (recipe) => {
      if (!recipe) {
        res.status(404).json({ message: 'Recipe does not exist' });
      } else {
        Favorites.create({
          UserId: req.decode.id,
          recipeId: recipe.id,
        });
      }
    },
    (err) => {
      res.status(500).json({ message: 'Invalid Request', Error: err });
    },
  ).catch((err) => {
    res.status(500).json({ message: 'Server Error', Error: err });
  });
};
export default {
  signin, signup, setFavorites, getFavorites,
};

