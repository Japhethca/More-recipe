import express from 'express';
import { signin, signup } from '../controllers/userController';
import { create, all, filter, updateRecipe, deleteRecipe, RecipeRreview } from '../controllers/recipeController';
import { jwt, app } from '../app';

const apiRouter = express.Router();


// Routes for API navigation
apiRouter.post('/users/signup', signup);
apiRouter.post('/users/signin', signin);
apiRouter.get('/recipes', all);
apiRouter.put('/recipes/:recipeId', updateRecipe);
apiRouter.delete('/recipes/:recipeId', deleteRecipe);
apiRouter.post('/recipes', create);
// apiRouter.get('/users/:userId/recipes',userRecipes);
apiRouter.get('recipes?sort=upvotes&order=ascending', filter);
// apiRouter.get('/user/:userId/favorites',userFavorites);
// apiRouter.post('/user/:recipeId/favorites',userFavorites);
// apiRouter.get('/recipes/:recipeId/upvotes', recipeController.upvotes);
apiRouter.get('/recipes/recipeId/reviews', RecipeRreview);

const isLoggedIn = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('secret_key'), (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed!' });
      }
      res.status(200).json({ message: 'Authentication Successful!' });
      req.decoded = decoded;
      next();
    });
  }
  // if (req.url === '/users/signin' || req.url === '/users/signup'){
  //   next();
  // }

  else {
    res.status(403).json({ message: 'failed! No token.' });
  }
};

export { apiRouter, isLoggedIn };
