import model from '../models';
import pagination from '../middlewares/pagination';

const { Recipes, Users, Reviews } = model;


/**
 * @description controller for posting / adding  a review
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
 * @description returns all reviews for a single recipe
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @returns {object} Http response
 */
export const getRecipeReview = (request, response) => {
  const { limit, page, offset } = pagination(request.query.limit, request.query.page);
  Reviews.findAndCountAll({
    limit,
    offset,
    where: {
      recipeId: request.params.recipeId,
    },
    include: [{ model: Users, attributes: ['username', 'photo'] }]
  })
    .then((result) => {
      if ((result.count < 1)) {
        return response.status(404).json({
          status: 'failed',
          message: 'No reviews for this recipe'
        });
      }
      response.status(200).json({
        status: 'success',
        message: 'Recipe Reviews',
        currentPage: page,
        totalPages: limit === null ? 1 : Math.ceil(result.count / limit),
        count: result.count,
        reviews: result.rows
      });
    })
    .catch(() => {
      response.json(500).json({
        status: 'failed',
        message: 'Server Error',
      });
    });
};
