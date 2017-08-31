const Recipe = require('../models').Recipe;

static class RecipeController {
  constructor(...args){
    super(...args)
  }
  create(req,res){
    return Recipe.create({
      name: req.body.name || Recipe.name,
      ingredient: req.body.ingredient || Recipe.ingredient,
      description: req.body.description || Recipe.description,
      directions: req.body.directions || Recipe.directions
    }).then(recipe => res.json(recipe)).catch(err => {
      res.status(404).send("not found");
    });
  }
  update(req, res){
    let recipe_id = req.params.id
    return Recipe.findOne({
      where:{
        id: recipe_id
      }

    }).then(user => res.json(user)).catch(err => res.send(error));

    }
  }

  module.exports = RecipeController;