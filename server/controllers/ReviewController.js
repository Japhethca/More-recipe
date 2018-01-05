import model from '../models';

const { Recipes, Users, Reviews } = model;


/**
 * @description post / adds  a review
 * @param {object} req - Express http request
 * @param {object} res - Express http response
 * @returns {object} Http response
 */
export const postReview = (req, res) => Recipes.findOne({
  where: {
    id: req.params.recipeId,
  },
})
  .then((recipe) => {
    if (!recipe) {
      return res.status(404).json({
        status: 'failed',
        message: 'Recipe with this Id does not exist'
      });
    }
    Reviews.create({
      content: req.body.content,
      recipeId: recipe.id,
      userId: req.decoded.id,
    })
      .then((review) => {
        review.reload({
          include: [
            {
              model: Users,
              attributes: ['username', 'photo']
            }
          ]
        })
          .then(result => res.status(201).json({
            status: 'successs',
            message: 'Review Created',
            review: result
          }));
      });
  })
  .catch(() => {
    res.status(500).json({
      status: 'failed',
      message: 'Request was not processed'
    });
  });


/**
 * @description gets all reviews for a single recipe
 * @param {object} req - Express http request
 * @param {object} res - Express http response
 * @returns {object} Http response
 */
export const getRecipeReview = (req, res) => {
  const limit = req.query.limit || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const offset = page !== 1 ? limit * (page - 1) : null;

  Reviews.findAndCountAll({
    limit,
    offset,
    where: {
      recipeId: req.params.recipeId,
    },
    include: [{ model: Users, attributes: ['username', 'photo'] }]
  })
    .then((result) => {
      if ((result.count < 1)) {
        return res.status(404).json({
          status: 'failed',
          message: 'No reviews for this recipe'
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'Recipe Reviews',
        count: result.count,
        reviews: result.rows
      });
    })
    .catch(() => {
      res.json(500).json({
        status: 'failed',
        message: 'Server Error',
      });
    });
};
