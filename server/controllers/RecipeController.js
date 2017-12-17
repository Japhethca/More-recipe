import models from '../models';
import { checkQuery } from '../middlewares/validators';

const { Recipes, Users, Reviews } = models;

/**
 * @param {object} req
 * @param {object} res
 * @param {callback} next -function
 * @returns {object} HTTP response object
 */
export const sortOrOrderRecipes = (req, res, next) => {
  if (req.query.order && req.query.sort) {
    const validSort = ['name', 'createdAt', 'upvotes', 'downvotes'];
    const sortOrder = req.query.order === 'descending'
      || req.query.order === 'desc' ? 'DESC' : 'ASC';

    if (checkQuery(req.query.sort, validSort)) {
      return Recipes.findAll({
        order: [[req.query.sort, sortOrder]],
        include: [
          {
            model: Users,
            attributes: ['username', 'photo']
          },
          {
            model: Reviews,
            limit: 1,
            attributes: ['id', 'content', 'createdAt'],
            include: [
              {
                model: Users,
                attributes: ['username', 'photo']
              }
            ]
          }
        ]
      }).then(recipes => res.status(200).json({
        status: 'success',
        message: 'Successfully filtered Recipes',
        recipes
      }))
        .catch(() => res.status(500).json({
          status: 'failed',
          message: 'Server Error'
        }));
    }
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid request query'
    });
  }
  next();
};

export const searchRecipe = (req, res, next) => {
  if (req.query.search) {
    const limit = req.query.limit || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = page !== 1 ? limit * (page - 1) : null;
    return Recipes.findAll({
      limit,
      offset,
      include: [
        {
          model: Users,
          attributes: ['username', 'photo']
        },
        {
          model: Reviews,
          attributes: ['id', 'content', 'createdAt'],
          include: [
            {
              model: Users,
              attributes: ['username', 'photo']
            }
          ]
        }
      ],
      where: {
        $or: [
          {
            name: { $iLike: `%${req.query.search}%` }
          },
          {
            ingredients: { $iLike: `%${req.query.search}%` }
          }
        ]
      }
    })
      .then((recipes) => {
        if (recipes.length < 1) {
          res.status(404).json({
            status: 'failed',
            message: 'No recipe found'
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Search Result(s)',
            recipes
          });
        }
      })
      .catch(() =>
        res.status(500).json({
          status: 'failed',
          message: 'Server Error'
        }));
  }
  next();
};

/**
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} request Response
 */
export const allRecipes = (req, res) => {
  let limit = null;
  if (parseInt(req.query.limit, 10)) {
    limit = req.query.limit || null;
  }
  const page = parseInt(req.query.page, 10) || 1;
  const offset = page !== 1 ? limit * (page - 1) : null;

  return Recipes.findAll({
    include: [
      {
        model: Users,
        attributes: ['username', 'photo']
      },
      {
        model: Reviews,
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: Users,
            attributes: ['username', 'photo']
          }
        ],
      }
    ],
    offset,
    limit,
    order: [['createdAt', 'DESC']]
  }).then((recipes) => {
    if (recipes.length > 0) {
      if (req.query) {
        return res.status(200).json({
          status: 'success',
          message: 'All recipes:',
          recipes
        });
      }
    }
    res.status(404).json({ message: 'No Recipes found' });
  });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} HTTP response
 */
export const createRecipe = (req, res) => Recipes.findOne({ where: { name: req.body.name } })
  .then((recipe) => {
    console.log(recipe);
    if (recipe && recipe.userId === req.decoded.id) {
      return res.status(409).json({
        status: 'failed',
        message: 'You have already created a recipe with this name before'
      });
    }
  }).then(() => Recipes.create({
    name: req.body.name,
    ingredients: req.body.ingredients,
    direction: req.body.direction,
    description: req.body.description,
    userId: req.decoded.id,
    image: req.body.image
  }))
  .then((created) => {
    res.status(201).json({
      status: 'success',
      message: 'Recipe successfully created',
      recipe: created
    });
  })
  .catch(() => {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error'
    });
  });

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} HTTP response
 */
export const getRecipeById = (req, res) => Recipes.findOne({
  include: [
    {
      model: Users,
      attributes: ['username', 'photo']
    },
    {
      model: Reviews,
      attributes: ['id', 'createdAt', 'content'],
      include: [
        {
          model: Users,
          attributes: ['username', 'photo']
        }
      ]
    }
  ],
  where: {
    id: req.params.recipeId,
  },
})
  .then((recipe) => {
    if (!recipe) {
      return res.status(404).json({
        status: 'failed',
        message: 'Recipe does not exist!'
      });
    }
    res.status(200).json({
      status: 'success',
      recipe
    });
  });

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} HTTP respsonse
   */
export const updateRecipe = (req, res) => Recipes.findOne({
  where: {
    id: req.params.recipeId,
  },
})
  .then((recipe) => {
    if (!recipe) {
      res.status(404).json({
        status: 'failed',
        message: 'Recipe does not exist'
      });
    } else if (recipe.userId === req.decoded.id) {
      return recipe.update({
        name: req.body.name,
        ingredients: req.body.ingredients,
        description: req.body.description,
        direction: req.body.direction,
        image: req.body.image
      })
        .then(() => {
          recipe.reload().then(updatedRecipe => res.status(201).json({
            status: 'success',
            message: 'Recipe updated Successful',
            recipe: updatedRecipe,
          }));
        });
    } else {
      res.status(403).json({
        status: 'failed',
        message: 'User is not authorized to update this recipe!'
      });
    }
  })
  .catch(() => {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error'
    });
  });

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} Http response
 */
export const deleteRecipe = (req, res) => {
  const thisRecipeId = req.params.recipeId;
  return Recipes.findById(thisRecipeId).then((recipe) => {
    if (!recipe) {
      res.status(404).json({
        status: 'failed',
        message: 'Recipe does not exist'
      });
    }
    if (recipe.userId === req.decoded.id) {
      recipe.destroy();
      res.status(200).json({
        status: 'success',
        message: 'Recipe deleted successfully'
      });
    } else {
      res.status(403).json({
        status: 'failed',
        message: 'User is not authorised to delete this recipe'
      });
    }
  })
    .catch(() => res.status(500).json({
      status: 'failed',
      message: 'Server Error'
    }));
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} Http response
 */
export const getUserRecipes = (req, res) => {
  let limit = null;
  if (parseInt(req.query.limit, 10)) {
    limit = req.query.limit || null;
  }
  const page = parseInt(req.query.page, 10) || 1;
  const offset = page !== 1 ? limit * (page - 1) : null;

  return Recipes.findAll({
    limit,
    offset,
    include: [
      {
        model: Reviews,
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: Users,
            attributes: ['username', 'photo']
          }
        ]
      }
    ],
    where: {
      userId: req.decoded.id,
    },
    order: [['createdAt', 'DESC']]

  })
    .then((recipes) => {
      if (recipes.length > 0) {
        Users.findById(req.decoded.id).then(() => {
          res.status(200).json({
            status: 'success',
            message: 'Successfully loaded users recipes',
            recipes
          });
        });
      } else {
        res.status(404).json({
          status: 'failed',
          message: 'User has not created any recipe'
        });
      }
    })
    .catch(() => res.status(500).json({
      status: 'failed',
      message: 'Server Error'
    }));
};

