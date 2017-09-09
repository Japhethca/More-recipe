import validator from 'validatorjs';
import models from '../models';


const Votes = models.Votes,
  Users = models.Users,
  Recipes = models.Recipes;

 
const sortObject = (obj) => {
  let list = []
  for (let prop in obj){
    
  }
}
// controllers for handling voting in application
const VotingController = {
  // controller for handling upvotes
  upVotes(req,res){
    if (req.params.recipeId < 1){
      return res.status(403).json({message: 'Recipe id does not exist'})
    }
    Votes.findAll({
      where: {
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }
    }).then(vote => {
      if (vote.length > 0){
        return res.status(403).json({message: 'Already upvoted recipe'})
      }
    }).then(() => {
      return Recipes.findById(req.params.recipeId)
      })
      .then(recipe => {
        if (!recipe){
          return res.status(404).json({message: 'Recipe does not exist!'});
        }
        Votes.create(
          {
            vote: 1,
            RecipeId: req.params.recipeId,
            UserId: req.decoded.id,
          
          });
        recipe.increment('upVotes');
        res.status(200).json({message: 'Recipe upvoted Successfully', Recipe: recipe})
      })
      .catch(err => {
        res.status(400).json({message: err.name});
      });
  },
  // controller for handling downvotes in application
  downVote(req, res){
    if (req.params.recipeId < 1){
      return res.status(403).json({message: 'Recipe id does not exist'})
    }
    Votes.findAll({
      where: {
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }
    }).then(vote => {
      if (vote.length > 0){
        return res.status(403).json({message: 'Already upvoted recipe'})
      }
    }).then(() => {
      return Recipes.findById(req.params.recipeId);
      })
      .then(recipe => {
        if (!recipe){
          return res.status(404).json({message: 'Recipe does not exist!'});
        }
        Votes.create(
          {
            vote: 0,
            RecipeId: req.params.recipeId,
            UserId: req.decoded.id,
          
          });
        recipe.decrement('downVotes');
        res.status(200).json({message: 'Recipe downvoted Successfully', Recipe: recipe})
      })
      .catch(err => {
        res.status(400).json({message: err});
      });
  },

  // controller for sorting recipes in ascending or descending order
  sortRecipe(req,res){
    let sortvalidator = new validator(req.query, sortRule);
    if (sortvalidator.passes()){
      if (req.query.sort === 'upVotes' && req.query.order === 'descending'){
        Recipes.findAll().then(sorted => {
          if (sorted.length < 1){
            return res.status(404).json({message: 'No recipe found'})
          }
          sortedRecipe = sorted.sort((a,b) => b.upVotes - a.upVotes);
          res.status(200).json({message: 'Sorted', Recipes: sortedRecipe })
        }).catch(err => {
          res.status(500).json({message: 'Request was not processed', Error: err })
        });
      } else {
        if (req.query.order === 'ascending'){
          Recipes.findAll().then(recipes => {
            if (recipes.length < 0){
              res.status(400).json({message:'No recipes found'})
            }
            res.status(200).json(recipes);
          })
        }
      }
    }
    else{
      res.status(403).json(sortvalidator.errors);
    }
  }
}

export default VotingController;