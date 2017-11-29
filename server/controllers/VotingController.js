// this file contains fuctions for controlling recipe voting
// Both upvotes and downvotes
import models from '../models';


const { Votes } = models,
  { Recipes } = models;


// controllers for handling voting in application
const VotingController = {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} Http response
   */
  upVotes(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(404).json({ message: 'Recipe id does not exist' });
    }
    if (isNaN(parseInt(req.params.recipeId, 10))) {
      return res.status(400).json({ message: 'invalid Url Parameter' });
    }
    // finds all votes that matches the given user and recipe id
    Votes.findOne({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then((vote) => {
      // if vote is found
      if (vote) {
        const upvoted = vote.get('vote');
        // if user has voted before
        // look for the recipe
        Recipes.findById(req.params.recipeId).then((recipe) => {
          if (!recipe) {
            res.status(404).json({ message: 'No such recipe exists' });
          } else if (recipe) {
            // if the the user upvote the recipe before decrement the upvotes
            if (upvoted === 1) {
              vote.destroy();
              recipe.decrement('upvotes').then(() => {
                recipe.reload().then(() => {
                  res.status(200).json({ message: 'Upvote Sucessful', Recipe: recipe });
                });
              });
            // if not increment the upvotes and decrement downvotes
            } else if (upvoted === 0) {
              vote.update({ vote: 1 });
              recipe.decrement('downvotes').then(() => {
                recipe.increment('upvotes').then(() => {
                  recipe.reload();
                }).then(() => {
                  res.status(200).json({ message: 'Recipe Upvoted', Recipe: recipe });
                });
              });
            }
          }
        });
      } else {
        // if recipe has not been voted by user
        // find recipe and increment its upvotes field
        Recipes.findById(req.params.recipeId)
          .then((recipe) => {
            if (!recipe) {
              return res.status(404).json({ message: 'Recipe does not exist!' });
            } // create a new vote if user has not voted before
            Votes.create({
              vote: 1,
              recipeId: req.params.recipeId,
              userId: req.decoded.id,
            });
            recipe.increment('upvotes').then(() => {
              recipe.reload().then(() => {
                res.status(200).json({ message: 'Recipe Upvoted', Recipe: recipe });
              });
            });
          });
      }
      // catch object error that occurs
    })
      .catch(() => {
        res.status(500).json({ message: 'Request was not processed' });
      });
  },


  /**
   *
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} Http response
   */
  downVote(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(403).json({ message: 'Recipe id does not exist' });
    }
    if (isNaN(parseInt(req.params.recipeId, 10))) {
      return res.status(400).json({ message: 'invalid Url Parameter' });
    }
    Votes.findOne({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    }).then((vote) => {
      /* checks if there's any vote found in the db
      * if any is found, return an already exist message
      */
      if (vote) {
        const downvoted = vote.get('vote');
        Recipes.findById(req.params.recipeId).then((recipe) => {
          if (!recipe) {
            res.status(404).json({ message: 'No such recipe exists' });
          } else if (recipe) {
            if (downvoted === 0) {
              vote.destroy();
              recipe.decrement('downvotes').then(() => {
                recipe.reload().then(() => {
                  res.status(200).json({ message: 'Recipe Unvoted', Recipe: recipe });
                });
              });
            } else if (downvoted === 1) {
              vote.update({ vote: 0 });
              recipe.increment('downvotes').then(() => {
                recipe.decrement('upvotes').then(() => {
                  recipe.reload();
                }).then(() => {
                  res.status(200).json({ message: 'Recipe Downvoted', Recipe: recipe });
                });
              });
            }
          }
        });
      } else {
        // if recipe has not been voted by user
        // find recipe and increment its upvotes field
        Recipes.findById(req.params.recipeId)
          .then((recipe) => {
            if (!recipe) {
              return res.status(404).json({ message: 'Recipe does not exist!' });
            } // create a new vote if user has not voted before
            Votes.create({
              vote: 0,
              recipeId: req.params.recipeId,
              userId: req.decoded.id,
            });
            recipe.increment('downvotes').then(() => {
              recipe.reload().then(() => {
                res.status(200).json({ message: 'Recipe Downvoted', Recipe: recipe });
              });
            });
          });
      }
    })
      .catch(() => {
        res.status(500).json({ message: 'Request was not Processed' });
      });
  },
};

export default VotingController;
