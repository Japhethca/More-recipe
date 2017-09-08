import models from '../models';
// import validator from 'valitatorjs';

const Recipes = models.Recipes;
const Users = models.Users;

// const recipeRules = {
//   name: 'required',
//   ingredients: 'required',
//   descriptions: 'required',
// };

// get all recipes in the application
const RecipeController = {

  all(req, res){
    return Recipes.findAll()
      .then(recipes => {
        if(recipe.length > 0){
          res.status(200).json({'All recipes': recipes})
        }
        else {
        res.status(404).json('No recipes');
        }
      })
      .catch(err => {
        res.status(403).json(err);
      });
    }
  },

// creating new recipe from response

  create = (req, res) => {
    return Recipes.create({
      name: req.body.name,
      ingredients: req.body.ingredient,
      descriptions: req.body.description,
      directions: req.body.direction,
      UserId: req.decoded.id,
    
    })
    .then(recipe => {
      console.log(recipe)
      if (!recipe){
        return res.status(400).json(
          {
            message: 'Recipe was not created'
          }
        )
      }
      return res.status(200).json(
        { 
          message: 'Recipe Created!', Recipe: recipe 
        }
      )
    })    
    .catch((err) => {
      res.status(404).json(
        {
          message: "Request was not processed", 
        }
      );
    });
  },


// gets a single recipe by ID
  getRecipeById = (req, res) => {
    Recipes.findOne(
    {
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
  updateRecipe = (req, res) => {
    return Recipes.findOne(
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
  },

// controller for deleting recipe by recipeId
  deleteRecipe = (req, res) => {
    Recipes.findOne({
      where: 
      {
      id: req.params.recipeId,
      },
    })
    .then((recipe) => {
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
  }

export default RecipeController;