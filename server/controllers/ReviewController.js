import model from '../models';

const { Recipes, Users, Reviews } = model;

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} Http response
 */
// export const getAllReview = (req, res) => Reviews.findAll({
//   order: [['createdAt', 'DESC']],
//   include: [
//     {
//       model: Users,
//       attributes: ['username', 'firstname', 'photo']
//     }]
// })
//   .then((reviews) => {
//     if (reviews.length < 1) {
//       res.status(404).json({
//         status: 'failed',
//         message: 'There are no review in the application yet'
//       });
//     } else {
//       res.status(200).json({
//         status: 'success',
//         reviews
//       });
//     }
//   })
//   .catch(() => res.status(500).json({
//     status: 'failed',
//     message: 'Request was not precessed'
//   }));

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} Http response
 */
const recipeReview = (req, res) => Recipes.findOne({
  where: {
    id: req.params.recipeId,
  },
})
  .then((recipe) => {
    if (!recipe) {
      return res.status(404).json({
        status: 'failed',
        message: 'Recipe with this Id does not exist'
      });
    }
    Reviews.create({
      content: req.body.content,
      recipeId: recipe.id,
      userId: req.decoded.id,
    })
      .then(() => {
        recipe.reload({
          include: [
            {
              model: Reviews,
              attributes: ['id', 'content', 'createdAt'],
              include: [
                {
                  model: Users,
                  attributes: ['id', 'username', 'photo']
                }
              ]
            }
          ]
        })
          .then(rec => res.status(201).json({
            status: 'successs',
            message: 'Review Created',
            recipe: rec
          }));
      });
  })
  .catch(() => {
    res.status(500).json({
      status: 'failed',
      message: 'Request was not processed'
    });
  });

export default recipeReview;

// /**
//  * @param {object} req
//  * @param {object} res
//  * @returns {object} Http response
//  */
// export const getRecipeReview = (req, res) => Reviews.findAll({
//   where: {
//     recipeId: req.params.recipeId,
//   },
// })
//   .then((reviews) => {
//     if (!(reviews.length > 0)) {
//       return res.status(404).json({
//         status: 'failed',
//         message: 'No reviews for this recipe'
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       message: 'Recipe Reviews',
//       Reviews: reviews
//     });
//   })
//   .catch(() => {
//     res.json(500).json({
//       status: 'failed',
//       message: 'Server Error',
//     });
//   });

