import _ from 'lodash';

import models from '../models';
import { checkQuery } from '../middlewares/validators';

const { Recipes, Users, Reviews } = models;


/**
 * @param {object} request
 * @param {object} response
 * @param {callback} next -function
 * @returns {object} HTTP response object
 */
export const sortOrOrderRecipes = (request, response, next) => {
  if (request.query.order && request.query.sort) {
    const validSort = ['name', 'createdAt', 'upvotes', 'downvotes'];
    const sortOrder = request.query.order === 'descending'
      || request.query.order === 'desc' ? 'DESC' : 'ASC';

    if (checkQuery(request.query.sort, validSort)) {
      return Recipes.findAndCountAll({
        order: [[request.query.sort, sortOrder]],
        include: [
          {
            model: Users,
            as: 'author',
            attributes: ['username', 'photo']
          },
        ]
      }).then(result => response.status(200).json({
        status: 'success',
        message: 'Successfully filtered Recipes',
        count: result.count,
        recipes: result.rows
      }))
        .catch(() => response.status(500).json({
          status: 'failed',
          message: 'Server Error'
        }));
    }
    return response.status(400).json({
      status: 'failed',
      message: 'Invalid request query'
    });
  }
  next();
};

export const searchRecipe = (request, response, next) => {
  if (request.query.search) {
    const limit = request.query.limit || 10;
    const page = parseInt(request.query.page, 10) || 1;
    const offset = page !== 1 ? limit * (page - 1) : null;

    return Recipes.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Users,
          as: 'author',
          attributes: ['username', 'photo']
        }
      ],
      where: {
        $or: [
          {
            name: { $iLike: `%${request.query.search}%` }
          },
          {
            ingredients: { $iLike: `%${request.query.search}%` }
          }
        ]
      }
    })
      .then((result) => {
        if (result.count < 1) {
          response.status(404).json({
            status: 'failed',
            message: 'No recipe found'
          });
        } else {
          response.status(200).json({
            status: 'success',
            message: 'Search Result(s)',
            count: result.count,
            recipes: result.rows
          });
        }
      })
      .catch(() =>
        response.status(500).json({
          status: 'failed',
          message: 'Server Error'
        }));
  }
  next();
};

/**
 * @param {Object} request
 * @param {Object} response
 * @returns {Object} request Response
 */
export const allRecipes = (request, response) => {
  let limit = null;
  if (parseInt(request.query.limit, 10)) {
    limit = request.query.limit || null;
  }
  const page = parseInt(request.query.page, 10) || 1;
  const offset = page !== 1 ? limit * (page - 1) : null;

  return Recipes.findAndCountAll({
    include: [
      {
        model: Users,
        as: 'author',
        attributes: ['username', 'photo']
      }
    ],
    offset,
    limit,
    order: [['createdAt', 'DESC']]
  }).then((result) => {
    if (result.count > 0) {
      if (request.query) {
        return response.status(200).json({
          status: 'success',
          message: 'All recipes:',
          count: result.count,
          recipes: result.rows
        });
      }
    }
    response.status(404).json({ message: 'No Recipes found' });
  });
};

/**
 * @param {object} request
 * @param {object} response
 * @returns {object} HTTP response
 */
export const createRecipe = (request, response) => Recipes.findOne({
  where: {
    name: _.capitalize(request.body.name),
    userId: request.decoded.id
  }
})
  .then((recipe) => {
    if (recipe) {
      return response.status(409).json({
        status: 'failed',
        message: 'You have already created a recipe with this name before'
      });
    }
    Recipes.create({
      name: request.body.name,
      ingredients: request.body.ingredients,
      direction: request.body.direction,
      description: request.body.description,
      userId: request.decoded.id,
      image: request.body.image
    })
      .then(created => created.reload({ include: [{ model: Users, as: 'author' }] })
        .then((createdRecipe) => {
          response.status(201).json({
            status: 'success',
            message: 'Recipe successfully created',
            recipe: createdRecipe
          });
        }));
  })
  .catch(() => {
    response.status(500).json({
      status: 'failed',
      message: 'Server Error'
    });
  });

/**
 * @param {object} request
 * @param {object} response
 * @returns {object} HTTP response
 */
export const getRecipeById = (request, response) => Recipes.findOne({
  include: [
    {
      model: Users,
      as: 'author',
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
    id: request.params.recipeId,
  },
})
  .then((recipe) => {
    if (!recipe) {
      return response.status(404).json({
        status: 'failed',
        message: 'Recipe does not exist!'
      });
    }
    response.status(200).json({
      status: 'success',
      recipe
    });
  });

  /**
   * @param {object} request
   * @param {object} response
   * @returns {object} HTTP respsonse
   */
export const updateRecipe = (request, response) => Recipes.findOne({
  where: {
    id: request.params.recipeId,
  },
})
  .then((recipe) => {
    if (!recipe) {
      response.status(404).json({
        status: 'failed',
        message: 'Recipe does not exist'
      });
    } else if (recipe.userId === request.decoded.id) {
      return recipe.update({
        name: request.body.name,
        ingredients: request.body.ingredients,
        description: request.body.description,
        direction: request.body.direction,
        image: request.body.image
      })
        .then(() => {
          recipe.reload({ include: [{ model: Users, as: 'author' }] })
            .then(updatedRecipe => response.status(201).json({
              status: 'success',
              message: 'Recipe updated Successful',
              recipe: updatedRecipe,
            }));
        });
    } else {
      response.status(403).json({
        status: 'failed',
        message: 'User is not authorized to update this recipe!'
      });
    }
  })
  .catch(() => {
    response.status(500).json({
      status: 'failed',
      message: 'Server Error'
    });
  });

/**
 * @param {object} request
 * @param {object} response
 * @returns {object} Http response
 */
export const deleteRecipe = (request, response) => {
  const thisRecipeId = request.params.recipeId;
  return Recipes.findById(thisRecipeId).then((recipe) => {
    if (!recipe) {
      return response.status(404).json({
        status: 'failed',
        message: 'Recipe does not exist'
      });
    }
    if (recipe.userId === request.decoded.id) {
      recipe.destroy();
      return response.status(200).json({
        status: 'success',
        message: 'Recipe deleted successfully'
      });
    }
    return response.status(403).json({
      status: 'failed',
      message: 'User is not authorised to delete this recipe'
    });
  })
    .catch(() => response.status(500).json({
      status: 'failed',
      message: 'Server Error'
    }));
};

/**
 * @param {object} request
 * @param {object} response
 * @returns {object} Http response
 */
export const getUserRecipes = (request, response) => {
  let limit = null;
  if (parseInt(request.query.limit, 10)) {
    limit = request.query.limit || null;
  }
  const page = parseInt(request.query.page, 10) || 1;
  const offset = page !== 1 ? limit * (page - 1) : null;

  return Recipes.findAndCountAll({
    limit,
    offset,
    where: {
      userId: request.decoded.id,
    },
    include: [
      {
        model: Users,
        as: 'author',
        attributes: ['id', 'photo', 'username']
      }
    ],
    order: [['createdAt', 'DESC']]

  })
    .then((result) => {
      if (result.count > 0) {
        Users.findById(request.decoded.id).then(() => {
          response.status(200).json({
            status: 'success',
            message: 'Successfully loaded users recipes',
            count: result.count,
            recipes: result.rows
          });
        });
      } else {
        response.status(404).json({
          status: 'failed',
          message: 'User has not created any recipe'
        });
      }
    })
    .catch(() => response.status(500).json({
      status: 'failed',
      message: 'Server Error'
    }));
};

