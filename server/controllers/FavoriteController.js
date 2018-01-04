import model from '../models';


const { Favorites, Recipes, Users } = model;

/**
 * @param {object} request -Express request object
 * @param {object} response -Express response object
 * @returns {object} response - Express response
 */
export const getUserFavorites = (request, response) => {
  let limit = null;
  if (parseInt(request.query.limit, 10)) {
    limit = request.query.limit || null;
  }
  const page = parseInt(request.query.page, 10) || 1;
  const offset = page !== 1 ? limit * (page - 1) : null;

  Favorites.findAndCountAll({
    limit,
    offset,
    where: {
      userId: request.decoded.id
    },
    attributes: { exclude: ['id', 'userId', 'recipeId', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Recipes,
        include:
        [
          {
            model: Users,
            as: 'author',
            attributes: ['username', 'photo']
          }
        ]
      }
    ]
  })
    .then((result) => {
      if (result.rows.length < 1) {
        response.status(404).json({
          status: 'failed',
          message: 'User has no favorites'
        });
      } else {
        response.status(200).json({
          status: 'success',
          message: `${request.decoded.user} Favorite recipes`,
          count: result.count,
          favorites: result.rows
        });
      }
    })
    .catch(() => response.status(500).json({
      status: 'failed',
      message: 'Request was not Processed'
    }));
};

/**
 * @param {object} request -HTTP request
 * @param {object} response -HTTP response
 * @returns {object} response object
 */
export const addToFavorites = (request, response) => Recipes.findById(request.params.recipeId)
  .then((recipe) => {
    if (!recipe) {
      return response.status(404).json({
        status: 'failed',
        message: 'Invalid recipe Id'
      });
    }
    Favorites.findAll({
      where: {
        recipeId: request.params.recipeId,
        userId: request.decoded.id
      }
    }).then((favorite) => {
      if (favorite.length > 0) {
        return response.status(409).json({
          status: 'failed',
          message: 'Recipe already in favorites'
        });
      }
      Favorites.create({
        userId: request.decoded.id,
        recipeId: request.params.recipeId,
      })
        .then(() => {
          response.status(201).json({
            status: 'success',
            message: 'Recipe Successfully added to favorites'
          });
        });
    });
  })
  .catch(() => {
    response.status(500).json({
      status: 'failed',
      message: 'Request was not be Processed'
    });
  });

  /**
 * @param {onbject} request -Express HTTP request
 * @param {onbject} response -Express HTTP response
 * @returns {object} HTTP response object
 */
export const removeFromFavorites = (request, response) => Favorites.findOne({
  where: {
    recipeId: request.params.recipeId
  }
})
  .then((recipe) => {
    if (!recipe) {
      response.status(404).json({
        status: 'failed',
        message: 'Recipe with this id is not in favorites'
      });
    } else {
      recipe.destroy();
      response.status(200).json({
        status: 'success',
        message: 'Recipe successfully removed from favorites'
      });
    }
  })
  .catch(errors => response.status(500).json({ status: 'failed', errors }));
