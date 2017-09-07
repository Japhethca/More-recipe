import validator from 'validatorjs';
import jwt  from 'jsonwebtoken';
import models from '../models';

const Users = models.Users;

const signinRules = {
  
}
// A controller that accepts user details
// and creates a new user in the database
const UserController = {
  
  signup(req, res){
    Users.findAll({
      where: {
        email: req.body.email,
      },
    })
    .then((users) => {
      // checks if the user is already in the databse
      if (users.length > 0) {
        return res.status(400).json(
          { 
            message: 'User already exists' 
          });
        } // creates new user
      return Users.create(
        {
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
    }
  );
},


// Use login details of otther users
  signin(req, res){
    Users.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    })
    .then((user) => {
        console.log(user);
        if (!user) {
          return res.status(400).json({ message: 'User does not exist' });
        } 
        const token = jwt.sign({ id: user.id }, app.get('secret_key'), { expiresIn: 84000 });
        res.status(200).json({ message: 'Login Successful!', 'User detail': user, Token: token });
    })
    .catch(err => res.status(500).json(({ message: 'Request could not be Processed', Error: err.name })));
  },
  users(req,res){
    return Users.findAll().then(users => {
      res.status(200).json(users);
    }).catch(err => {
      return res.status.json({ Message: 'An arror Occured', Error: err });
    });
  },
}

export default UserController;