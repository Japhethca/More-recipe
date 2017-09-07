import model from '../models';
// import { isValidInt, isValidStr } from '../middlewares/validators';

const Favorites = model.Favorites;
const Users = model.Users;
const Recipe = model.Recipes;


// handles GET​ : /api/users/<userId>/recipes
// controller for getting users favorietes

const getFavorites = (req, res) => {
  Favorites.findAll({
  where: {
    userId: req.params.userId,
    },
  })
  .then((favorites) => {
    if (!favorites) {
      return res.status(404).json({ message: 'User has no Favorites' });
    } 
    res.status(200).json({
      message: 'Favorites',
      });
  })
  .catch((err) => {
    res.status(403).json(
      {
        Error: true,
      }
    );
  });
};
// Sets favorites for a user when given a recipe id
const setFavorites = (req, res) => {
  return Favorites.create(
    {
      title: req.body.title,
      content: req.body.content,
      userId: req.decode.id,
      RecipeId: res.params.recipeId,
    }
  )
  .then(favorite => {
    if (!favorite) {
      res.status(401).json({ message: 'Favorites not added', Error: true });
    }
  })
  .catch((err) => {
    if (err) {
      res.status(400).json({ Error: true });
    }
  });
};

export { getFavorites, setFavorites };
