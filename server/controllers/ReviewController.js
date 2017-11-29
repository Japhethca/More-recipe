// models import statement
import Validator from 'validatorjs';
import model from '../models';

const { Recipes } = model,
  { Users } = model,
  { Reviews } = model;

const createRules = {
  content: 'required'
};

const ReviewController = {
/**
 *
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} Http response
 */
  getAllReview(req, res) {
    return Reviews.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['username', 'firstname', 'photo']
        }]
    }).then((reviews) => {
      if (reviews.length < 1) {
        res.status(404).json({ message: 'There are no review in the application yet' });
      } else {
        res.status(200).json(reviews);
      }
    }).catch(() => res.status(500).json({ message: 'Request was not precessed' }));
  },

  /**
 *
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} Http response
 */
  recipeReview(req, res) {
    const validReview = new Validator(req.body, createRules);
    if (isNaN(parseInt(req.params.recipeId, 10))) {
      return res.status(400).json({ message: 'Invalid Url Parameter' });
    }
    if (validReview.passes()) {
      return Recipes.findOne({
        where: {
          id: req.params.recipeId,
        },
      })
        .then((recipe) => {
          if (!recipe) {
            return res.status(404).json({ message: 'Recipe with this Id does not exist' });
          }
          Reviews.create({
            content: req.body.content,
            recipeId: recipe.id,
            userId: req.decoded.id,
          })
            .then((review) => {
              res.status(201).json({
                message: 'Review Created',
                Recipe: recipe,
                Review: review,
              });
            });
        })
        .catch(() => {
          res.status(500).json({
            message: 'Request was not processed'
          });
        });
    }
    const errors = Object.values(validReview.errors.errors).map(val => val[0]);
    res.status(403).json({ message: errors });
  },


  /**
   *
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} Http response
   */
  getRecipeReview(req, res) {
    if (isNaN(parseInt(req.params.recipeId, 10))) {
      return res.status(400).json({ message: 'Invalid Url Parameter' });
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
      .catch(() => {
        res.json(400).json({
          message: 'Server Error',
        });
      });
  }
};

export default ReviewController;

