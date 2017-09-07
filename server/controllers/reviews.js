import model from '../models';
import { validateInt, validateStr } from '../middlewares/validators';

const Favorites = model.Favorites;
const Users = model.Users;
const Recipe = model.Recipes;


const recipeReview = function (req, res) {
  return Recipes.findOne({
    where: {
      id: req.params.recipeId,
    },
  }).then((recipe) => {
    if (!recipe) {
      return res.status(400).json(req.param);
    }
  });
};

const getRecipeReview = (req, res) => Reviews.findAll({
  where: {
    RecipeId: req.params.recipeId,
  },
}).then((reviews) => {
  if (!reviews) {
    res.status(404).json({ message: 'Invalid Recipe Id' });
  } else {
    res.status(200).json({ message: 'Recipe Reviews', Reviews: reviews });
  }
}, (err) => {
  if (err) {
    res.status(500).json({ message: 'Cannot Request', Error: err });
  }
}).catch((err) => {
  res.json(500).json({ message: 'Server', Error: err });
});


// Sorts recipes according to parameter provided
// in  the URL
const filter = (req, res) => {
  const sortBy = req.params.sort;
  const sortOrder = req.params.order;
  if (sortOrder === 'ascending') {
    // let sort = {ascending: '', descending}
    return Recipes.findAll({
      order: [
        [Votes, 'upVotes', 'ASC'],
      ],
    });
  }

  return Recipes.findAll({
    order: [
      [Votes, 'downVotes', 'ASC'],
    ],
  });
};

export { getRecipeReview, recipeReview, filter };
