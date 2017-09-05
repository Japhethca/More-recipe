import models from '../models';
import { jwt, app } from '../app';

const Users = models.Users;
const Recipes = models.Recipes;
const Favorites = models.Favorites;
// export default class UserController


const signup = (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userName = req.body.username;
  const userFirstname = req.body.firstname;
  const userLastname = req.body.lastname;
  const aboutme = req.body.aboutme;
  return Users.findAll({ where: { email: userEmail } }).then((users) => {
    if (users.length > 0) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      res.status(200).json({ message: 'create uses' });
    }
  });
};

/*  if (!Boolean(userEmail) && !Boolean(userPassword)
    && !Boolean(userName) && !Boolean(userFirstname)
    && !Boolean(userLastname) && !Boolean(aboutMe)) {
    return res.status(406).json({ message: 'fields cannot be empty' });
  }
  let alreadyUsers =  Users.findAll({
      where: {
        email: userEmail,
        password: userPassword
      }
    }).then(users => {
      if (users) {
        for (let user of users) {
          if (user.get('email') === userEmail) {
            return res/status(401).json({ message: "User already exists! Try signing in with email and password" });
          }
        }
      }
    })

  return Users.create({
    firstName: userFirstname,
    lastName: userLastname,
    userName: userName,
    password: userPassword,
    aboutMe: aboutme,
    email: userEmail,
  })
    .then(user => {
      return res.status(200).json({ message: 'Account Successfully created! You can now sign in with your email and password','user':user })
    })
    .catch(err => {
      return res.status(500).json(err)
    });
  } */


// proceses user sign in
const signin = (req, res) => {
  const emails = req.body.email;
  const passwords = req.body.password;
  if (!emails && !passwords) {
    return res.status(406).json({ message: 'Email or Password Should not be empty' });
  }
  return Users
    .findOne({
      where: {
        email: emails,
        password: passwords,
      },
    })
    .then((user) => {
      if (user.email) {
        req.session.email = req.body.email;
        req.session.userId = user.get('id');

        let token = jwt.sign(user, app.get('secret_key'), { expiresInMinutes: 1440 });
        res.status(200).json({ username: user.userName, message: 'Login Sucessful!' });
      } else {
        res.status(406).send('Invalid Username or Password');
      }
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
};

// returns all recipes that is added by a particular user
const userRecipes = (req, res) => {
  const userId = parseInt(req.params.userId);

  return Recipes.findAll({
    where: {
      usersId: userId,
    },
  })
    .then((recipes) => {
      res.status(201).json(recipes);
    }).catch((err) => {
      res.statu(500).json({ message: err });
    });
};


export { signin, signup, userRecipes };
