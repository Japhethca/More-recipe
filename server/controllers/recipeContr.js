import models from '../models';
import validator from 'validatorjs';
import Sequelize from 'sequelize';
import db from '../models/index';

const Recipes = models.Recipes;
const sequelize = db.sequelize;

const createRules = {
  name: 'required',
  ingredient: 'required',
  description: 'required',
  direction: 'required'
};

const updateRules = {
  name: 'required',
  ingredient: 'required',
  description: 'required',
  direction: 'required'
};


const RecipeController = {
// get all recipes in the application
  listUpvotes(req, res, next) {
    if (req.query.order && req.query.sort) {
      return sequelize.query(`
      SELECT * FROM "Recipes" AS "Recipes" ORDER BY "upVotes" DESC;`, { type: Sequelize.QueryTypes.SELECT })
        .then(recipes => res.status(200).json({ message: 'All Recipes displayed in Descending order', recipes }))
        .catch(err => res.status(400).json(err));
    }
    next();
  },

  // controller for returning all recipe in the application
  all(req, res) {
    return Recipes.findAll().then((recipes) => {
      if (recipes.length > 0) {
        if (req.query) { return res.status(200).json({ message: 'All recipes:', List: recipes }); }
      }
      res.status(404).json({ message: 'No Recipes found' });
    });
  },


  // creating new recipe from response
  createRecipe(req, res) {
    const recipeValidator = new validator(req.body, createRules);
    if (recipeValidator.passes()) {
      Recipes.findAll({ where: { name: req.body.title } })
        .then((recipes) => {
          if (recipes.length > 0) {
            res.status(400).json({ message: 'Recipe with this name already exists' });
          }
        }).then(() => Recipes.create({
          name: req.body.name,
          ingredients: req.body.ingredient,
          directions: req.body.direction,
          descriptions: req.body.description,
          UserId: req.decoded.id,
        }))
        .then((recipe) => {
          res.status(200).json({ message: 'Recipe successfully created', Details: recipe });
        })
        .catch(() => {
          res.status(400).json({ message: 'Request was not processed' });
        });
    } else {
      res.status(403).json(recipeValidator.errors);
    }
  },


  // gets a single recipe by ID
  getRecipeById(req, res) {
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
  updateRecipe(req, res) {
    const validateValues = new validator(req.body, updateRules);
    // all the values are valid
    if (validateValues.passes()) {
      return Recipes.findOne({
        where: {
          id: req.params.recipeId,
        },
      })
        .then((recipe) => {
          if (!recipe) {
            res.status(404).json({ message: 'Recipe does not exist' });
          } else if (recipe.UserId === req.decoded.id) {
            recipe.update({
              name: req.body.name,
              ingredients: req.body.ingredient,
              descriptions: req.body.description,
              directions: req.body.direction,
            })
              .then(() => {
                res.json(200).json({
                  message: 'Recipe update Successful',
                  updated: recipe,
                });
              })
              .catch((err) => {
                res.status(500).json({ message: 'Update Unsuccessful!', error: err });
              });
          } else {
            res.status(401).json({ message: 'User is not authorized to update this recipe!' });
          }
        })
        .catch((err) => {
          res.status(403).json({
            message: 'Request cannot be processed',
            Error: err
          });
        });
    }

    res.status(403).json(validateValues.errors);
  },

  // controller for deleting recipe by recipeId
  deleteRecipe(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(403).json({ message: 'Recipe Id cannot be less than 1' });
    }
    Recipes.findOne({
      where:
        {
          id: req.params.recipeId,
        },
    })
      .then((recipe) => {
        if (recipe == null || recipe.length < 0) {
          res.status(404).json({ message: 'Cannot delete recipe, does not exist' });
        }
        if (recipe.UserId === req.decoded.id) {
          recipe.destroy();
          res.status(200).json({ message: 'Recipe deleted successfully' });
        } else {
          res.status(403).json({ message: 'You are not authorised to delete this recipe!' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Server Error', Error: err });
      });
  },
};

export default RecipeController;
