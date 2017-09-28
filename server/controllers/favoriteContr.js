import model from '../models';

const Favorites = model.Favorites,
  Recipes = model.Recipes,
  Users = model.Users;


// handles GET​ : /api/users/<userId>/recipes
// controller for getting users favorietes
const findRecipesById = (favorites) => {
  const recipes = [];
  if (favorites.length < 0) {
    return 'User has no favorite recipes';
  }

  favorites.forEach((id) => {
    Recipes.findById(parseInt(id, 10)).then((recipe) => {
      if (recipe) {
        recipes.push('recipe not found');
      } else {
        recipes.push('not found');
      }
    });
  });

  return recipes;
};

const FavoriteController = {
  getUserFavorites(req, res) {
    Favorites.findAll({
      where: {
        userId: req.params.usersId
      },
      attributes: [],
      include: [
        {
          model: Recipes
        }
      ]
    }).then((favorites) => {
      if (favorites.length < 1) {
        res.status(404).json({ message: 'User has no favorites' });
      } else {
        res.status(200).json({ 'User favorites': favorites });
      }
    }).catch(Errors => res.status(500).json({ Errors }));
  },

  getFavorites(req, res) {
    Favorites.findAll({
      where: { userId: req.params.usersId },
      include: [Recipes]
    }).then((favorites) => {
      if (favorites.length < 1) {
        return res.status(404).json({ message: 'User does not have any favorites' });
      }

      res.status(200).json({ message: `User ${req.params.usersId}`, Recipes: favorites });
    }).catch((errors) => {
      res.status(400).json({ message: 'Request was not processed', errors });
    });
  },


  // Sets favorites for a user when given a recipe id
  setFavorites(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(404).json({ message: 'No recipe with that id exists' });
    }

    return Favorites.findAll({
      where: {
        RecipeId: req.params.recipeId
      }
    }).then((recipe) => {
      if (recipe.length > 0) {
        return res.status(403).json({ message: 'Recipe already in favorites' });
      }

      Favorites.create({
        favorite: req.body.favorite,
        UserId: req.decoded.id,
        RecipeId: req.params.recipeId,
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
        RecipeId: req.params.recipeId
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
