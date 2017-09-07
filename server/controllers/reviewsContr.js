// models import statement 
import model from '../models';

const Users = model.Users,
  Recipes = model.Recipes,
  Reviews = model.Reviews;



const ReviewController = {

  recipeReview(req, res){
    return Recipes.findOne(
      {
        where: {
          id: req.params.recipeId,
        },
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).json({message: 'Invalid recipe Id'});
        }
        Reviews.create(
          {
            title: req.body.title,
            content: req.body.content,
            RecipeId: recipe.id,
            UserId: req.decoded.id,
          })
          .then((review) => {
            res.status(200).json(
              {
                message: 'Review Created',
                Recipe: recipe,
                Review: review,
              })
          })
          .catch(err => {
            res.status(400).Json(
              {
                message: 'Request was not process',
                Error: err,
              }
            )
          });
        })
      .catch(err => {
        res.status(400).json(
          {
            message: 'Request was not processed',
            Error: err,
          }
        )
      });
    },


//returns the reviews of a particular recipe
  getRecipeReview(req, res){
    return Reviews.findAll({
      where: {
        RecipeId: req.params.recipeId,
      },
    })
    .then((reviews) => {
      if (!(reviews.length > 0)) {
        return res.status(404).json({ message: 'No reviews for this recipe' });
      } 
      res.status(200).json({ message: 'Recipe Reviews', 'All Reviews': reviews });
      })
    .catch((err) => {
      res.json(400).json(
        { 
          message: 'Could not process request', 
          Error: err
        }
      );
    });
  }
}

export default ReviewController

