import _ from 'lodash';

import models from '../models';
import pagination from '../middlewares/pagination';
import { checkQuery } from '../middlewares/validators';

const { Recipes, Users, Reviews } = models;


/**
 * @description sorts and orders recipe
 * @param {object} request - Express http request
 * @param {object} response - Express http response
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
        message: 'Recipes successfully sorted',
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
      message: 'Request query was not understood'
    });
  }
  next();
};

/**
 * @description handles searching for recipe by name or ingredients
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @param {callback} next -function
 * @returns {object} HTTP response object
 */
export const searchRecipe = (request, response, next) => {
  if (request.query.search) {
    const {
      limit,
      page,
      offset
    } = pagination(request.query.limit, request.query.page);

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
            message: 'Recipe not found'
          });
        } else {
          response.status(200).json({
            status: 'success',
            message: 'Search successful',
            currentPage: page,
            totalPages: limit === null ? 1 : Math.ceil(result.count / limit),
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
 * @description returns all recipes by latest
 * @param {Object} request -Express http request
 * @param {Object} response Express http response
 * @returns {Object} - Http response
 */
export const allRecipes = (request, response) => {
  const { limit, page, offset } = pagination(
    request.query.limit,
    request.query.page
  );
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
          message: 'Successfully returned recipes',
          currentPage: page,
          totalPages: limit === null ? 1 : Math.ceil(result.count / limit),
          count: result.count,
          recipes: result.rows
        });
      }
    }
    response.status(404).json({ message: 'No Recipes found' });
  });
};

/**
 * @description creates new recipe
 * @param {object} request -Express http request
 * @param {object} response Express http response
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
      .then(created => created.reload({
        include: [
          {
            model: Users,
            as: 'author',
            attributes: ['username', 'photo']
          }
        ]
      })
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
 * @description returns a single recipe details
 * @param {object} request Express http request
 * @param {object} response Express http response
 * @returns {object} HTTP response
 */
export const getSingleRecipe = (request, response) => Recipes.findOne({
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
      message: 'Recipe returned successfully',
      recipe
    });
  });

  /**
   * @description controller for updating a single recipe
   * @param {object} request - Express http request
   * @param {object} response - Express http response
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
          recipe.reload({
            include: [
              {
                model: Users,
                as: 'author',
                attributes: ['username', 'photo']
              }
            ]
          })
            .then(updatedRecipe => response.status(201).json({
              status: 'success',
              message: 'Recipe updated Successfully',
              recipe: updatedRecipe,
            }));
        });
    } else {
      response.status(401).json({
        status: 'failed',
        message: 'You are not authorized to update this recipe!'
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
 * @description controller for deleting single recipe from the database
 * @param {object} request - Express http request
 * @param {object} response - Express http response
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
    return response.status(401).json({
      status: 'failed',
      message: 'You are not authorised to delete this recipe'
    });
  })
    .catch(() => response.status(500).json({
      status: 'failed',
      message: 'Server Error'
    }));
};

/**
 * @description returns all recipes created by a single user
 * @param {object} request - Express http request
 * @param {object} response - Express http response
 * @returns {object} Http response
 */
export const getUserRecipes = (request, response) => {
  const {
    limit,
    page,
    offset
  } = pagination(request.query.limit, request.query.page);
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
            currentPage: page,
            totalPages: limit === null ? 1 : Math.ceil(result.count / limit),
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

