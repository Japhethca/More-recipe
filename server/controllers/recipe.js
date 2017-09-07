import models from '../models';
import { validateInt, validateStr } from '../middlewares/validators';

const Recipes = models.Recipes;
const Users = models.Users;


// get all recipes in the application
const all = (req, res) => Recipes.findAll()
  .then(recipes => res.status(200).json(
    {
      'All recipes': recipes,
    })
);


// creating new recipe from response
const create = (req, res) =>
  Recipes.create(
    {
      name: req.body.name,
      ingredients: req.body.ingredient,
      descriptions: req.body.description,
      directions: req.body.direction,
      UserId: req.decoded.id,
  })
  .then(recipe => res.status(200).json(
    { 
      message: 'Recipe Created!', Recipe: recipe 
    })
  )
  .catch((err) => {
      res.status(404).json({ err });
  });


// gets a single recipe by ID
const getRecipeById = (req, res) => Recipes.findOne(
  {
    where: {
      id: req.params.recipeId,
    },
  })
  .then((recipe) => {
    if (!recipe) {
      res.status(400).json({ message: 'Recipe does not exist!' });
    }   
    else {
      res.status(200).json(recipe);
    }
  });


/* controller for updating a single recipe */
const updateRecipe = (req, res) => Recipes.findOne(
  {
    where: {
      id: req.params.recipeId,
    },
  })
  .then((recipe) => {
      if (!recipe) {
        res.status(404).json({ message: 'Recipe does not exist' });
      } 
      else if (recipe.UserId === req.decoded.id) {
        recipe.update(
          {
            name: req.body.name,
            ingredients: req.body.ingredient,
            descriptions: req.body.description,
            directions: req.body.direction,
          }
        )
        .then(() => {
          res.json(200).json(
            {
              message: 'Recipe update Successful',
              updated: recipe,
            }
          );
        })
        .catch((err) => {
          res.status(500).json({ message: 'Update Unsuccessful!', error: err });
        });
      } else {
        res.status(401).json({ message: 'User is not authorized to update this recipe!' });
      }
  });


// controller for deleting recipe by recipeId
const deleteRecipe = (req, res) => Recipes.findOne({
  where: {
    id: validateInt(req.params.recipeId, res),
  },
})
  .then((recipe) => {
    if ((recipe.UserId) === validateInt(req.decoded.id)) {
      recipe.destroy();
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(403).json({ message: 'You are not authorised to delete this recipe!' });
    }
  })
  .catch((err) => {
    res.status(500).json({ message: 'Server Error', Error: err });
  });


export default {
  create, all, updateRecipe, deleteRecipe, getRecipeById,
};
