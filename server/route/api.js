const express = require('express');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');

const apiRouter = express.Router();

apiRouter.post('/users/signup',  );
apiRouter.post('/users/signin', );
apiRouter.post('/recipes',  );
apiRouter.put('recipes/:recipeId',  );
apiRouter.delete('');

module.exports = apiRouter;