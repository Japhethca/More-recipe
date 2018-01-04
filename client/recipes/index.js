import CreateUpdateRecipe from './containers/CreateUpdateRecipe';
import RecipeUpdatePage from './components/RecipeUpdatePage';
import reducer from './recipeReducer';
import SingleRecipe from './containers/SingleRecipePage';
import Card from './containers/RecipeCard';
import ListRecipes from './components/Recipes';

export const CreateRecipe = CreateUpdateRecipe;
export const recipeReducer = reducer;
export const SingleRecipePage = SingleRecipe;
export const UpdateRecipe = RecipeUpdatePage;
export const RecipeCard = Card;
export const Recipes = ListRecipes;
