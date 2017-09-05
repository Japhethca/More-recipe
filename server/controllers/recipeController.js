import models from '../models';

const Recipes = models.Recipes;
const Users = models.Users;
const Votes = models.Votes;


// creating new recipe from response
const create = (req, res) => {
  const rName = req.body.name;
  const rIngredients = req.body.ingredient;
  const rDescription = req.body.description;
  const rDirection = req.body.direction;
  const author = req.session.userId;

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
    .then(recipe => res.json({ message: 'Recipe Created!' }))
    .catch((err) => {
      res.status(404).send(err);
    });
};


// get all recipes in the application
const all = (req, res) => Recipes.findAll()
  .then(recipes => res.status(200).json(recipes));

// Allows user to post a review on a recipe
const RecipeRreview = (req, res) => Recipes.findOne({
  where: {
    id: parseInt(req.params.recipeId),
  },
})
  .then((recipe) => {
    // checks if content is empty
    if (!(req.body.content === '')) {
      Reviews.create({
        title: req.body.title,
        content: req.body.content,
        reviewer: reviewName,
        UserId: req.session.userId,
      }).then((review) => {
        res.status(200).json({ message: 'Review updated successfully' });
      });
    } else {
      res.status(401).json({ message: 'content must not be empty' });
    }
  })
  .catch((err) => {
    res.status.json({ message: 'Server Error' });
  });

// Sorts recipes according to parameter provided
// in  the URL
const filter = (req, res) => {
  const sortBy = req.params.sort;
  const sortOrder = req.params.order;
  if (sortOrder == 'ascending') {
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

const updateRecipe = (req, res) => {
  const userid = req.session.userId;
  const recipeId = req.params.recipeId;
  const rName = req.body.name;
  const rIngredients = req.body.ingredient;
  const rDescription = req.body.description;
  const rDirection = req.body.direction;

  return Recipes.findOne({
    where: {
      id: recipeId,
    },
  }).then((recipe) => {
    if (!recipe) {
      res.status(404).json({ message: 'Invalid recipe Id!' });
    } else if ((recipe.get('UserId') === parseInt(userid))) {
      recipe.update({
        name: rName,
        ingredients: rIngredients,
        descriptions: rDescription,
        directions: rDirection,
      }).then((recipe) => {
        res.json(201).json({
          message: 'Recipe update Successful',
          updated: recipe,
        });
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
const deleteRecipe = (req, res) => {
  const recipeId = req.params.recipeId;
  return Recipes.findOne({
    where: {
      id: recipeId,
    },
  })
    .then((recipe) => {
      if ((recipe.get('UserId')) === parseInt(req.session.userId)) {
        recipe.destroy();
        res.status(204).json({ message: 'Recipe deleted successfully' });
      } else {
        res.status(401).json({ message: 'You are not authorised to delete this recipe!' });
        console.log(recipe.get('UserId'));
      }
    })
    .catch((err) => {
      res.status(501).json({ message: 'Server Error', Error: err });
    });
};
export { create, all, filter, updateRecipe, deleteRecipe, RecipeRreview };
