// this file contains fuctions for controlling recipe voting 
// Both upvotes and downvotes
import models from '../models';


const Votes = models.Votes,
  Users = models.Users,
  Recipes = models.Recipes;


// controllers for handling voting in application
const VotingController = {
  // controller for handling upvotes
  upVotes(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(403).json({ message: 'Recipe id does not exist' });
    }
    // finds all votes that matches the given user and recipe id
    Votes.findAll({
      where: {
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }
    }).then((vote) => {
      // if vote is found
      if (vote.length > 0) {
        return res.status(403).json({ message: 'Already upvoted recipe' });
      }// find a single recipe by id
    }).then(() => Recipes.findById(req.params.recipeId))
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({ message: 'Recipe does not exist!' });
        } // create a new vote if user has not voted before
        Votes.create({
          vote: 1,
          RecipeId: req.params.recipeId,
          UserId: req.decoded.id,
        });
        // adds a new vote to the recipe
        recipe.increment('upVotes');
        res.status(200).json({ message: 'Recipe upvoted Successfully', Recipe: recipe });
      })
      .catch((err) => {
        res.status(400).json({ message: err.name });
      });
  },


  // controller for handling downvotes in application
  downVote(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(403).json({ message: 'Recipe id does not exist' });
    }
    Votes.findAll({
      where: {
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId
      }
    }).then((vote) => {
      
      /* checks if there's any vote found in the db
      * if any is found, return an already exist message
      */
      if (vote.length > 0) {
        return res.status(403).json({ message: 'Already upvoted recipe' });
      }
    }).then(() => Recipes.findById(req.params.recipeId))
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({ message: 'Recipe does not exist!' });
        }
        Votes.create({
          vote: 0,
          RecipeId: req.params.recipeId,
          UserId: req.decoded.id,

        });
        recipe.increment('downVotes');
        res.status(200).json({ message: 'Recipe downvoted Successfully', Recipe: recipe });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  },

};

export default VotingController;
