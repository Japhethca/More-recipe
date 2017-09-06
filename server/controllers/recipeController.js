import models from '../models';

const Recipes = models.Recipes;
const Users = models.Users;
const Votes = models.Votes;
const Reviews = models.Reviews;


// creating new recipe from response
const create = (req, res) => {
  const rName = req.body.name;
  const rIngredients = req.body.ingredient;
  const rDescription = req.body.description;
  const rDirection = req.body.direction;
  const author = req.decoded.id;

  if (!rName && !rIngredients) {
    return res.status(406).json({ message: 'Recipe name & ingredients must not be empty' });
  }
  if (!(author)) {
    return res.status(203).json({ message: 'Recipe cannot be created, Invalid User' });
  }

  return Recipes.create({

    name: rName,
    ingredients: rIngredients,
    descriptions: rDescription,
    directions: rDirection,
    UserId: author,
  })
    .then(recipe => res.status(200).json({ message: 'Recipe Created!', Recipe: recipe }))
    .catch((err) => {
      res.status(404).json({ err });
    });
};


// get all recipes in the application
const all = (req, res) => Recipes.findAll()
  .then(recipes => res.status(200).json({
    'All recipes': recipes,
  }));


// gets a single recipe by ID
const getRecipeById = (req, res) => Recipes.findOne({
  where: {
    id: req.params.recipeId,
  },
}).then((recipe) => {
  if (!recipe) {
    res.status(400).json({ message: 'Recipe does not exist!' });
  } else {
    res.status(200).json(recipe);
  }
});

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
// Allows user to post a review on a recipe
/* const recipeReview = (req, res) => Recipes.findOne({ where: { id: req.params.recipeId } })
  .then((recipe) => {
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe Does not exist!' });
    }
    return Reviews.create({
      title: res.body.title,
      content: req.body.content,
      RecipeId: req.params.id,
      UserId: req.decoded.id,
    }).then((review) => { res.status(201).json(review); })
      .catch(err => res.status(500).json({ message: 'Server Error', Error: err.name }));
  }).catch(err => res.status(500).json(err.name));
 */
// Controller for getting the review of a single recipe by its id
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


/* controller for updating a single recipe */
const updateRecipe = (req, res) => {
  const userid = req.decoded.id;
  const recipeId = req.params.recipeId;
  const rName = req.body.name;
  const rIngredients = req.body.ingredient;
  const rDescription = req.body.description;
  const rDirection = req.body.direction;

  return Recipes.findOne({
    where: {
      id: recipeId,
    },
  })
    .then((recipe) => {
      if (!recipe) {
        res.status(404).json({ message: 'Invalid recipe Id!' });
      } else if ((recipe.UserId === parseInt(userid, 10))) {
        recipe.update({
          name: rName,
          ingredients: rIngredients,
          descriptions: rDescription,
          directions: rDirection,
        }).then(() => {
          res.json(200).json({
            message: 'Recipe update Successful',
            updated: recipe,
          });
        }, (err) => {
          if (err) {
            res.status(400).json({ message: 'Server Error', Error: err });
          }
        })
          .catch((err) => {
            res.status(500).json({ message: 'Update Unsuccessful!', error: err });
          });
      } else {
        res.status(401).json({ message: 'User is not authorized to update this recipe!' });
      }
    });
};


// controller for deleting recipe by recipeId
const deleteRecipe = (req, res) => Recipes.findOne({
  where: {
    id: req.params.recipeId,
  },
})
  .then((recipe) => {
    if (recipe.UserId === req.decoded.id) {
      recipe.destroy();
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(403).json({ message: 'You are not authorised to delete this recipe!' });
    }
  })
  .catch((err) => {
    res.status(500).json({ message: 'Server Error', Error: err });
  });


export default {
  create, all, filter, updateRecipe, deleteRecipe, recipeReview, getRecipeReview, getRecipeById,
};
