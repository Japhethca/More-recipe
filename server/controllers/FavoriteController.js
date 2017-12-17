import model from '../models';


const {
  Favorites, Recipes, Users, Reviews
} = model;

/**
 * @param {object} req -http request object
 * @param {object} res -http response object
 * @returns {object} res - http response
 */
export const getUserFavorites = (req, res) => Favorites.findAll({
  where: {
    userId: req.decoded.id
  },
  include: [
    {
      model: Recipes,
      include: [
        {
          model: Reviews,
          attributes: ['id', 'content', 'createdAt'],
          include: [
            {
              model: Users,
              attributes: ['id', 'username', 'photo']
            }
          ]
        }
      ]
    }
  ]
})
  .then((favorites) => {
    if (favorites.length < 1) {
      res.status(404).json({
        status: 'failed',
        message: 'User has no favorites'
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `${req.decoded.user} Favorite recipes`,
        favorites
      });
    }
  })
  .catch(() => res.status(500).json({
    status: 'failed',
    message: 'Request was not Processed'
  }));

/**
 * @param {object} req -HTTP request
 * @param {object} res -HTTP response
 * @returns {object} res object
 */
export const addToFavorites = (req, res) => Recipes.findById(req.params.recipeId)
  .then((recipe) => {
    if (!recipe) {
      return res.status(404).json({
        status: 'failed',
        message: 'Invalid recipe Id'
      });
    }
    Favorites.findAll({
      where: {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    }).then((favorite) => {
      if (favorite.length > 0) {
        return res.status(409).json({
          status: 'failed',
          message: 'Recipe already in favorites'
        });
      }
      Favorites.create({
        userId: req.decoded.id,
        recipeId: req.params.recipeId,
      })
        .then(() => {
          res.status(201).json({
            status: 'success',
            message: 'Recipe Successfully added to favorites'
          });
        });
    });
  })
  .catch(() => {
    res.status(500).json({
      status: 'failed',
      message: 'Request was not be Processed'
    });
  });

  /**
 * @param {onbject} req -HTTP request
 * @param {onbject} res -HTTP response
 * @returns {object} HTTP response object
 */
export const removeFromFavorites = (req, res) => Favorites.findOne({
  where: {
    recipeId: req.params.recipeId
  }
})
  .then((recipe) => {
    if (!recipe) {
      res.status(404).json({
        status: 'failed',
        message: 'Recipe with this id is not in favorites'
      });
    } else {
      recipe.destroy();
      res.status(200).json({
        status: 'success',
        message: 'Recipe successfully removed from favorites'
      });
    }
  })
  .catch(errors => res.status(500).json({ status: 'failed', errors }));
