// models import statement
import Validator from 'validatorjs';
import model from '../models';

const { Recipes } = model,
  { Reviews } = model;

const createRules = {
  content: 'required'
};

const ReviewController = {

  getAllReview(req, res) {
    return Reviews.findAll({ order: [['createdAt', 'DESC']] }).then((reviews) => {
      if (reviews.length < 1) {
        res.status(404).json({ message: 'There are no review in the application yet' });
      } else {
        res.status(200).json(reviews);
      }
    }).catch(error => res.status(500).json(error));
  },


  recipeReview(req, res) {
    const validReview = new Validator(req.body, createRules);
    if (validReview.passes()) {
      return Recipes.findOne({
        where: {
          id: req.params.recipeId,
        },
      })
        .then((recipe) => {
          if (!recipe) {
            return res.status(404).json({ message: 'Invalid recipe Id' });
          }
          Reviews.create({
            content: req.body.content,
            recipeId: recipe.id,
            userId: req.decoded.id,
          })
            .then((review) => {
              res.status(200).json({
                message: 'Review Created',
                Recipe: recipe,
                Review: review,
              });
            })
            .catch((err) => {
              res.status(400).json({
                message: 'Request was not processed',
                Error: err,
              });
            });
        })
        .catch((err) => {
          res.status(400).json({
            message: 'Request was not processed',
            Error: err,
          });
        });
    }
    const errors = Object.values(validReview.errors.errors).map(val => val[0]);
    res.status(400).json({ message: errors });
  },


  // returns the reviews of a particular recipe
  getRecipeReview(req, res) {
    if (isNaN(parseInt(req.params.recipeId, 10))) {
      res.status(403).json({ message: 'Invalid request params' });
    }
    return Reviews.findAll({
      where: {
        recipeId: req.params.recipeId,
      },
    })
      .then((reviews) => {
        if (!(reviews.length > 0)) {
          return res.status(404).json({ message: 'No reviews for this recipe' });
        }
        res.status(200).json({ message: 'Recipe Reviews', Reviews: reviews });
      })
      .catch((err) => {
        res.json(400).json({
          message: 'Could not process request',
          Error: err
        });
      });
  }
};

export default ReviewController;

