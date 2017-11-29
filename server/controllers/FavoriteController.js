import model from '../models';

const { Favorites } = model,
  { Recipes } = model;


const FavoriteController = {
  /**
   *
   *
   * @param {object} req -http request object
   * @param {object} res -http response object
   * @returns {object} res - http response
   */
  getUserFavorites(req, res) {
    if (isNaN(parseInt(req.params.usersId, 10))) {
      return res.status(400).json({ message: 'invalid Url Parameter' });
    }
    Favorites.findAll({
      where: {
        userId: req.params.usersId
      },
      include: [
        {
          model: Recipes
        }
      ]
    }).then((favorites) => {
      if (favorites.length < 1) {
        res.status(404).json({ message: 'User has no favorites' });
      } else {
        res.status(200).json({ Favorites: favorites });
      }
    }).catch(() => res.status(500).json({ message: 'Request was not Processed' }));
  },

  /**
   *
   *
   * @param {object} req -HTTP request
   * @param {object} res -HTTP response
   * @returns {object} res object
   */
  setFavorites(req, res) {
    if (req.params.recipeId < 1 || isNaN(parseInt(req.params.recipeId, 10))) {
      return res.status(400).json({ message: 'Invalid recipeId in URL' });
    }

    return Favorites.findAll({
      where: {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    }).then((recipe) => {
      if (recipe.length > 0) {
        return res.status(409).json({ message: 'Recipe already in favorites' });
      }

      Favorites.create({
        userId: req.decoded.id,
        recipeId: req.params.recipeId,
      }).then(() => {
        res.status(201).json({ message: 'Recipe Successfully added to favorites' });
      });
    })
      .catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
          return res.status(404).json({ message: 'recipe with the provided id does not exist' });
        }
        res.status(500).json({ message: 'Request was not be Processed' });
      });
  },
  /**
 *
 *
 * @param {onbject} req -HTTP request
 * @param {onbject} res -HTTP response
 * @returns {object} HTTP response object
 */
  removeRecipeFromFavorites(req, res) {
    if (isNaN(parseInt(req.params.recipeId, 10))) {
      return res.status(400).json({ message: 'invalid Url Parameter' });
    }
    Favorites.findOne({
      where: {
        recipeId: req.params.recipeId
      }
    }).then((recipe) => {
      if (!recipe) {
        res.status(404).json({ message: 'Recipe with this id is not in favorites' });
      } else {
        recipe.destroy();
        res.status(200).json({ message: 'Recipe successfully removed from favorites' });
      }
    }).catch(errors => res.status(500).json({ errors }));
  }
};


export default FavoriteController;
