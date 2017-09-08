import validator from 'validatorjs';
import models from '../models';


const Votes = models.Votes,
  Users = models.Users,
  Recipes = models.Recipes;
const idRules = {
  recipeId: 'integer',
  userId: 'interger,'
}

const VotingController = {
  upVotes(req,res){
    const idValidator = new validator(req.params, idRules);
    if (idValidator.passes()){
      return Recipes.findOne({
        where: {
          id: req.params.recipeId,
        }
      }).then(recipe => {
        if (Object.getOwnPropertyNames(recipe).length === 0){
          return res.status(404).json({message: 'Recipe does not exist!'});
        }
        recipe.increment('upVotes');
        res.status(200).json({message: 'Recipe updated Successfully'})
      }).catch(err => {
        res.status(400).json({message: err});
      });
    }
    else {
      res.status(400).json({message: 'Error'})
    }
  },

  downVote(req, res){
    const idValidator = new validator(req.params, idRules);
    if (idValidator.passes()){
      return Recipes.findOne({
        where: {
          id: req.params.recipeId,
        }
      }).then(recipe => {
        if (Object.getOwnPropertyNames(recipe).length === 0){
          return res.status(404).json({message: 'Recipe does not exist!'});
        }
        recipe.increment('downVotes');
        res.status(200).json({message: 'Recipe updated Successfully'})
      }).catch(err => {
        res.status(400).json({message: err});
      });
    }
    else {
      res.status(400).json({message: 'Error'})
    }
  },
}

export default VotingController;