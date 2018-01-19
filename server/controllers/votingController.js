import models from '../models';

// models instance
const { Votes, Recipes } = models;

/**
 * @description handles upvoting single recipe
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @returns {object} Http response
 */
export const upVote = (request, response) => Votes.findOne({
  where: {
    userId: request.decoded.id,
    recipeId: request.params.recipeId
  }
})
  .then((vote) => {
    // if vote is found
    if (vote) {
      const upvoted = vote.get('vote');
      // if user has voted before
      // look for the recipe
      Recipes.findById(request.params.recipeId).then((recipe) => {
        if (!recipe) {
          response.status(404).json({
            status: 'failed',
            message: 'No such recipe exists'
          });
        } else if (recipe) {
          // if the the user upvote the recipe before decrement the upvotes
          if (upvoted === 1) {
            vote.destroy();
            recipe.decrement('upvotes')
              .then(() => {
                recipe.reload().then(() => {
                  response.status(200).json({
                    status: 'success',
                    message: 'Recipe unvoted',
                    recipe
                  });
                });
              });
            // if not increment the upvotes and decrement downvotes
          } else if (upvoted === 0) {
            vote.update({ vote: 1 });
            recipe.decrement('downvotes')
              .then(() => {
                recipe.increment('upvotes')
                  .then(() => {
                    recipe.reload();
                  })
                  .then(() => {
                    response.status(200).json({
                      status: 'success',
                      message: 'Recipe Upvoted',
                      recipe
                    });
                  });
              });
          }
        }
      });
    } else {
      // if recipe has not been voted by user
      // find recipe and increment its upvotes field
      Recipes.findById(request.params.recipeId)
        .then((recipe) => {
          if (!recipe) {
            return response.status(404).json({
              status: 'failed',
              message: 'Recipe does not exist!'
            });
          } // create a new vote if user has not voted before
          Votes.create({
            vote: 1,
            recipeId: request.params.recipeId,
            userId: request.decoded.id,
          });
          recipe.increment('upvotes')
            .then(() => {
              recipe.reload()
                .then(() => {
                  response.status(200).json({
                    status: 'success',
                    message: 'Recipe Upvoted',
                    recipe
                  });
                });
            });
        });
    }
  })
  .catch(() => {
    response.status(500).json({
      status: 'failed',
      message: 'Request was not processed'
    });
  });


/**
 * @description handles downvoting a single recipe
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @returns {object} Http response
 */
export const downVote = (request, response) => Votes.findOne({
  where: {
    userId: request.decoded.id,
    recipeId: request.params.recipeId
  }
}).then((vote) => {
  /* checks if there's any vote found in the db
      * if any is found, return an already exist message
      */
  if (vote) {
    const downvoted = vote.get('vote');
    Recipes.findById(request.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          response.status(404).json({
            status: 'failed',
            message: 'Recipe does not exist'
          });
        } else if (recipe) {
          if (downvoted === 0) {
            vote.destroy();
            recipe.decrement('downvotes')
              .then(() => {
                recipe.reload()
                  .then(() => {
                    response.status(200).json({
                      status: 'success',
                      message: 'Recipe Unvoted',
                      recipe
                    });
                  });
              });
          } else if (downvoted === 1) {
            vote.update({ vote: 0 });
            recipe.increment('downvotes')
              .then(() => {
                recipe.decrement('upvotes')
                  .then(() => {
                    recipe.reload();
                  })
                  .then(() => {
                    response.status(200).json({
                      status: 'success',
                      message: 'Recipe Downvoted',
                      recipe
                    });
                  });
              });
          }
        }
      });
  } else {
    // if recipe has not been voted by user
    // find recipe and increment its upvotes field
    Recipes.findById(request.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return response.status(404).json({
            status: 'failed',
            message: 'Recipe does not exist!'
          });
        } // create a new vote if user has not voted before
        Votes.create({
          vote: 0,
          recipeId: request.params.recipeId,
          userId: request.decoded.id,
        });
        recipe.increment('downvotes')
          .then(() => {
            recipe.reload()
              .then(() => {
                response.status(200).json({
                  status: 'success',
                  message: 'Recipe Downvoted',
                  recipe
                });
              });
          });
      });
  }
})
  .catch(() => {
    response.status(500).json({
      status: 'failed',
      message: 'Request was not Processed'
    });
  });
