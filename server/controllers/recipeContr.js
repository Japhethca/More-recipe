import models from '../models';
import validator from 'validatorjs';

const Recipes = models.Recipes;
const Users = models.Users;

const recipeRules = {
  title: 'required',
  ingredient: 'required',
  description: 'required',
  direction: 'required'
};

const RecipeController = {
// get all recipes in the application
  all(req, res){
    return Recipes.findAll().then(recipes => {
      if (recipes.length > 0){
        return res.status(200).json({ message: "All recipes:", List: recipes });
      }
      res.status(404).json({message: 'No Recipes found'});
    })
  },


// creating new recipe from response
  createRecipe(req,res){
    let recipeValidator = new validator(req.body, recipeRules);
    if (recipeValidator.passes()){
      Recipes.findAll({where:{name: req.body.title}})
      .then(recipes => {
        if (recipes.length > 0){
          res.status(400).json({message: 'Recipe with this name already exists'});
        }
      }).then(() => Recipes.create({
        name: req.body.title,
        ingredients: req.body.ingredient,
        directions: req.body.direction,
        descriptions: req.body.description,
        UserId: req.decoded.id,
      }))
      .then(recipe => {
          res.status(200).json({message: 'Recipe successfully created', Details: recipe })
      })
      .catch(err => {
        res.status(400).json({message: 'Request was not processed'});
      });
    }
    else{
      res.status(403).json(recipeValidator.errors);
    }
  },


// gets a single recipe by ID
  getRecipeById(req, res){
      Recipes.findOne({
        where: {
          id: req.params.recipeId,
        },
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).json({ message: 'Recipe does not exist!' });
        }
        res.status(200).json(recipe);
      });
  },

/* controller for updating a single recipe */
  updateRecipe(req, res){
    const validateValues = new validator(req.body, recipeRules);
    // all the values are valid
    if (validateValues.passes()){
      return Recipes.findOne({
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
        } 
        else {
          res.status(401).json({ message: 'User is not authorized to update this recipe!' });
        }
      })
      .catch(err => {
        res.status(403).json({
          message: 'Request cannot be processed',
          Error: err
        })
      });
    }
    else {
      res.status(403).json(validateValues.errors);
    }
  },

// controller for deleting recipe by recipeId
  deleteRecipe (req, res){
    if (req.params.recipeId < 1){
      return res.status(403).json({message: 'Recipe Id cannot be less than 1'});
    }
    Recipes.findOne({
        where: 
        {
          id: req.params.recipeId,
        },
      })
      .then((recipe) => {
        if (recipe == null || recipe.length < 0){
          res.status(404).json({message: 'Cannot delete recipe, does not exist'});
        }
        if (recipe.UserId === req.decoded.id) {
          recipe.destroy();
          res.status(200).json({ message: 'Recipe deleted successfully' });
        } 
        else {
        res.status(403).json({ message: 'You are not authorised to delete this recipe!' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Server Error', Error: err });
      });
  },
}

export default RecipeController;