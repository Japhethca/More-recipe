import {Router} from 'express';
import userController from '../controllers/userController';
// import recipeController from '../controllers/recipeController';

const apiRouter = Router();

apiRouter.post('/users/signup', userController.signup);
apiRouter.post('/users/signin', userController.signin);
// apiRouter.post('/recipes', );
// apiRouter.put('recipes/:recipeId', recipeController.update );
// apiRouter.delete('/recipes/:recipeId',recipeController.destroy);
// apiRouter.get('/recipes', recipeController.retrieve);
// apiRouter.post('/recipes/:recipeId',recipeController.create);
// apiRouter.get('/users/:userId/recipes',userController.recipes);
// apiRouter.get('recipes?sort=upvotes&order=ascending',recipeController.sort);
// apiRouter.get('/user/favorites',userController.favorites);
// apiRouter.get('/recipes/:recipeId/upvotes', recipeController.upvotes);
// apiRouter.get('/recipes/recipeId/reviews', recipeController.reviews);

module.exports = apiRouter;