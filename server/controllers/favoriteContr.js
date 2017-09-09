import model from '../models';

const Favorites = model.Favorites;


// handles GET​ : /api/users/<userId>/recipes
// controller for getting users favorietes
const FavoriteController = {
  getFavorites(req, res) {
    Favorites.findAll({
      where: {
        UserId: req.params.userId
      }
    }).then((favorites) => {
      if (favorites.length < 1) {
        res.status(404).json({ message: 'User does not have any favorites' });
      }
      res.status(200).json(favorites);
    }).catch((err) => {
      res.status(400).json({ message: 'Request was not processed' });
    });
  },


  // Sets favorites for a user when given a recipe id
  setFavorites(req, res) {
    if (req.params.recipeId < 1) {
      return res.status(404).json({ message: 'No recipe with that id exists' });
    }
    return Favorites.create({
      favorite: req.body.favorite,
      UserId: req.decoded.id,
      RecipeId: req.params.recipeId,
    }).then(() => {
      res.status(200).json({ message: 'Recipe Successfully added to favorites' });
    }).catch((err) => {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({ message: 'recipe with the provided id does not exist' });
      }
      res.status(500).json({ message: 'Request was not be Processed', Error: err });
    });
  }

};


export default FavoriteController;
