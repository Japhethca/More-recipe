import model from '../models';

const Favorites = model.Favorites,
  Recipes = model.Recipes;


// handles GET​ : /api/users/<userId>/recipes
// controller for getting users favorietes

const FavoriteController = {
  getUserFavorites(req, res) {
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
    }).catch(Errors => res.status(500).json({ Errors }));
  },

  // Sets favorites for a user when given a recipe id
  setFavorites(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(404).json({ message: 'No recipe with that id exists' });
    }

    return Favorites.findAll({
      where: {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    }).then((recipe) => {
      if (recipe.length > 0) {
        return res.status(403).json({ message: 'Recipe already in favorites' });
      }

      Favorites.create({
        userId: req.decoded.id,
        recipeId: req.params.recipeId,
      }).then(() => {
        res.status(200).json({ message: 'Recipe Successfully added to favorites' });
      });
    })
      .catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
          return res.status(404).json({ message: 'recipe with the provided id does not exist' });
        }
        res.status(500).json({ message: 'Request was not be Processed', Error: err });
      });
  },

  removeRecipeFromFavorites(req, res) {
    Favorites.findOne({
      where: {
        recipeId: req.params.recipeId
      }
    }).then((recipe) => {
      if (!recipe) {
        res.status(404).json({ message: 'Recipe with this id is not in favorites' });
      } else {
        recipe.destroy();
        res.status(200).json({ message: 'recipe successfully removed from favorites' });
      }
    }).catch(errors => res.status(500).json({ errors }));
  }
};


export default FavoriteController;
