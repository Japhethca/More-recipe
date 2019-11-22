import model from '../models';
import pagination from '../utilities/pagination';

const { Recipes, Users, Reviews } = model;


/**
 * @description controller for posting / adding  a review
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @returns {object} Http response
 */
export const postReview = (request, response) => Recipes.findOne({
  where: {
    id: request.params.recipeId,
  },
})
  .then((recipe) => {
    if (!recipe) {
      return response.status(404).json({
        status: 'failed',
        message: 'Recipe with this Id does not exist'
      });
    }
    Reviews.create({
      content: request.body.content,
      recipeId: recipe.id,
      userId: request.decoded.id,
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
          .then(result => response.status(201).json({
            status: 'successs',
            message: 'Review Added Successfully',
            review: result
          }));
      });
  })
  .catch(() => {
    response.status(500).json({
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
  const {
    limit,
    page,
    offset
  } = pagination(request.query.limit, request.query.page);

  return Reviews.findAndCountAll({
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
        message: 'Recipe reviews successfully returned',
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
