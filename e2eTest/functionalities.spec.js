import faker from 'faker';
import selectors from './selectors';

const email = faker.internet.email();

const signin = selectors.loginPage;
const navigationBar = selectors.navigation;
const landing = selectors.landingPage;

export default {
  'Signin fails with invalid credentials': (client) => {
    client
      .url('http://localhost:50000')
      .pause(2000)
      .assert.visible(selectors.navigation.home)
      .click(selectors.navigation.home)
      .pause(3000)
      .assert.visible(landing.loginButton, 'login button')
      .moveToElement(landing.loginButton, 10, 10)
      .pause(2000)
      .click(landing.loginButton)
      .assert.visible(signin.loginHeading)
      .assert.visible(signin.emailInput)
      .pause(1000)
      .setValue(signin.emailInput, 'email')
      .assert.visible(signin.passwordInput)
      .setValue(signin.passwordInput, '1234')
      .pause(1000)
      .click(signin.submitButton)
      .pause(2000);
  },
  'Signin fails when username or email does not exist': (client) => {
    client
      .assert.visible(signin.loginHeading)
      .assert.visible(signin.emailInput)
      .clearValue(signin.loginHeading)
      .setValue(signin.emailInput, email)
      .pause(1000)
      .assert.visible(signin.passwordInput)
      .clearValue(signin.passwordInput)
      .setValue(signin.passwordInput, '12345')
      .pause(1000)
      .click(signin.submitButton)
      .pause(2000);
  },
  'Signin successfully with valid credentials': (client) => {
    client
      .assert.visible(signin.loginHeading)
      .assert.visible(signin.emailInput)
      .clearValue(signin.emailInput)
      .setValue(signin.emailInput, 'john@gmail.com')
      .pause(1000)
      .assert.visible(signin.passwordInput)
      .clearValue(signin.passwordInput)
      .setValue(signin.passwordInput, '123456789')
      .pause(1000)
      .click(signin.submitButton);
  },
  'user should create new recipe': (client) => {
    client
      .url('http://localhost:50000/recipes')
      .pause(2000)
      .assert.visible(navigationBar.dropdown, 'dropdown')
      .click(navigationBar.dropdown)
      .pause(2000)
      .assert.visible(navigationBar.createRecipe, 'create recipe')
      .assert.containsText(navigationBar.createRecipe, 'Create Recipe')
      .moveToElement(navigationBar.createRecipe, 10, 10)
      .pause(1000)
      .click(navigationBar.createRecipe)
      .assert.visible(selectors.recipeForm.name)
      .setValue(selectors.recipeForm.name, 'ogbono soup')
      .pause(500)
      .assert.visible(selectors.recipeForm.description)
      .setValue(selectors.recipeForm.description, 'an african soup')
      .pause(500)
      .assert.visible(selectors.recipeForm.ingredients)
      .setValue(selectors.recipeForm.ingredients, 'maggi and oil')
      .pause(500)
      .assert.visible(selectors.recipeForm.direction)
      .setValue(selectors.recipeForm.direction, 'just cook it')
      .pause(1000)
      .assert.visible(selectors.recipeForm.submitButton)
      .assert.containsText(selectors.recipeForm.submitButton, 'Submit')
      .moveToElement(selectors.recipeForm.submitButton, 10, 10)
      .pause(2000)
      .click(selectors.recipeForm.submitButton)
      .pause(3000)
      .assert.visible(selectors.navigation.home)
      .click(selectors.navigation.home)
      .pause(3000);
  },
  'users should be able to view the details of a single recipe': (client) => {
    client
      .pause(2000)
      .assert.visible(selectors.recipe)
      .pause(1000)
      .click(selectors.recipe)
      .assert.visible(selectors.buttons.favoriteButton, 'favorite button')
      .click(selectors.buttons.favoriteButton)
      .pause(3000)
      .click(selectors.buttons.favoriteButton)
      .pause(3000)
      .assert.visible(selectors.buttons.downvoteButton, 'downvote button')
      .click(selectors.buttons.downvoteButton)
      .pause(3000)
      .assert.visible(selectors.buttons.upvoteButton, 'upvote button')
      .click(selectors.buttons.upvoteButton)
      .pause(3000)
      .assert.visible(selectors.review.reviews, 'Reviews')
      .assert.containsText(selectors.review.reviews, 'Reviews')
      .moveToElement(selectors.review.reviews, 10, 10)
      .assert.visible(selectors.review.reviewInput, 'review form')
      .setValue(selectors.review.reviewInput, 'wow! this recipe is awesome.')
      .pause(2000)
      .assert.visible(selectors.review.submitButton)
      .click(selectors.review.submitButton)
      .pause(5000);
  },
  'user  should be able to search for recipe': (client) => {
    client
      .url('http://localhost:50000/recipes')
      .pause(2000)
      .assert.visible(navigationBar.search, 'search')
      .moveToElement(navigationBar.search, 10, 10)
      .pause(1000)
      .setValue(navigationBar.search, 'maggi')
      .pause(1500)
      .submitForm(navigationBar.search)
      .pause(1000)
      .assert.visible(selectors.navigation.home)
      .moveToElement(selectors.navigation.home, 10, 10)
      .pause(1000)
      .click(selectors.navigation.home);
  },
  'user should view their profile page': (client) => {
    client
      .click(navigationBar.dropdown)
      .pause(2000)
      .assert.visible(navigationBar.profile, 'profile')
      .assert.containsText(navigationBar.profile, 'Profile')
      .moveToElement(navigationBar.profile, 10, 10)
      .pause(400)
      .click(navigationBar.profile)
      .pause(2000)
      .assert.visible(selectors.profile.button, 'update profile')
      .assert.containsText(selectors.profile.button, 'UPDATE PROFILE')
      .click(selectors.profile.button)
      .assert.visible(selectors.profile.firstname, 'firstname')
      .moveToElement(selectors.profile.firstname, 10, 10)
      .clearValue(selectors.profile.firstname)
      .setValue(selectors.profile.firstname, 'john')
      .pause(1000)
      .assert.visible(selectors.profile.lastname, 'lastname')
      .moveToElement(selectors.profile.lastname, 10, 10)
      .clearValue(selectors.profile.lastname)
      .setValue(selectors.profile.lastname, 'snow')
      .pause(1000)
      .assert.visible(selectors.profile.aboutme, 'aboutme')
      .moveToElement(selectors.profile.aboutme, 10, 10)
      .clearValue(selectors.profile.aboutme)
      .setValue(selectors.profile.aboutme, 'Am a cool guy')
      .assert.visible(selectors.profile.updateButton, 'update button')
      .click(selectors.profile.updateButton)
      .pause(7000)
      .assert.visible(selectors.profile.finishButton, 'finish button')
      .click(selectors.profile.finishButton);
  },
  'user should view dashboard items': (client) => {
    client
      .pause(2000)
      .assert.visible(selectors.dashboard.myRecipes, 'personal recipes')
      .moveToElement(selectors.dashboard.myRecipes, 10, 10)
      .assert.containsText(selectors.dashboard.myRecipes, 'Personal Recipes')
      .click(selectors.dashboard.myRecipes)
      .pause(2000)
      .assert.visible(selectors.dashboard.favorites, 'Favorites reicipes')
      .moveToElement(selectors.dashboard.favorites, 10, 10)
      .assert.containsText(selectors.dashboard.favorites, 'Favorite Recipes')
      .click(selectors.dashboard.favorites)
      .pause(2000)
      .assert.visible(selectors.dashboard.createRecipe, 'create recipe')
      .moveToElement(selectors.dashboard.createRecipe, 10, 10)
      .pause(1000)
      .assert.visible(selectors.dashboard.logout, 'logout')
      .moveToElement(selectors.dashboard.logout, 10, 10)
      .click(selectors.dashboard.logout)
      .pause(2000)
      .closeWindow();
  }
};
