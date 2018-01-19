import selectors from './selectors';
import faker from 'faker';

const email = faker.internet.email();
const username = faker.internet.userName();

const signin = selectors.loginPage;
const navigationBar = selectors.navigation;
const landing = selectors.landingPage;
const signup = selectors.signupPage;

export default {
  'Landing Page': (client) => {
    client
      .url('http://localhost:50000')
      .waitForElementVisible('body', 1000)
      .assert.visible(landing.homeLink, 'site logo')
      .assert.containsText(landing.homeLink, 'More Recipes')
      .moveToElement(landing.homeLink, 10, 10)
      .pause(2000)
      .assert.visible(landing.loginLink, 'login link')
      .assert.containsText(landing.loginLink, 'Sign In')
      .moveToElement(landing.loginLink, 10, 10)
      .pause(2000)
      .click(landing.loginLink)
      .assert.urlEquals('http://localhost:50000/signin')
      .pause(1000)
      .assert.visible(selectors.navigation.home)
      .click(selectors.navigation.home)
      .pause(3000)
      .assert.visible(landing.signupLink, 'signup link')
      .assert.containsText(landing.signupLink, 'Sign Up')
      .moveToElement(landing.signupLink, 10, 10)
      .pause(2000)
      .click(landing.signupLink)
      .assert.urlEquals('http://localhost:50000/signup')
      .pause(2000)
      .assert.visible(selectors.navigation.home)
      .click(selectors.navigation.home)
      .pause(3000)
      .assert.containsText(
        landing.quote,
        'Find and Share Best and Exciting Recipes'
      )
      .moveToElement(landing.quote, 10, 10)
      .pause(2000)
      .assert.visible(landing.signupButton, 'register button')
      .moveToElement(landing.signupButton, 10, 10)
      .pause(2000)
      .assert.visible(landing.loginButton, 'login button')
      .moveToElement(landing.loginButton, 10, 10)
      .pause(2000)
      .assert.visible(landing.footer, 'footer')
      .moveToElement(landing.footer, 10, 10)
      .pause(2000)
      .moveToElement(landing.signupButton, 10, 10)
      .click(landing.signupButton);
  },
  'signup fails when fields are not valid': (client) => {
    client
      .pause(2000)
      .assert.visible(signup.header, 'signup header')
      .assert.visible(signup.usernameInput)
      .setValue(signup.usernameInput, email)
      .pause(1000)
      .assert.visible(signup.emailInput)
      .setValue(signup.emailInput, username)
      .pause(1000)
      .assert.visible(signup.passwordInput)
      .setValue(signup.passwordInput, '23')
      .pause(1000)
      .assert.visible(signup.comfirmPasswordInput)
      .setValue(signup.comfirmPasswordInput, '23688')
      .pause(1000)
      .submitForm(signup.registerButton)
      .pause(1000);
  },
  'signup successful with valid inputs': (client) => {
    client
      .assert.visible(signup.usernameInput)
      .clearValue(signup.usernameInput)
      .setValue(signup.usernameInput, username)
      .pause(1000)
      .assert.visible(signup.emailInput)
      .clearValue(signup.emailInput)
      .setValue(signup.emailInput, email)
      .pause(1000)
      .assert.visible(signup.passwordInput)
      .clearValue(signup.passwordInput)
      .setValue(signup.passwordInput, '123456789')
      .pause(1000)
      .assert.visible(signup.comfirmPasswordInput)
      .clearValue(signup.comfirmPasswordInput)
      .setValue(signup.comfirmPasswordInput, '123456789')
      .pause(1000)
      .click(signup.registerButton)
      .pause(2000)
      .url('http://localhost:50000/recipes')
      .assert.visible(navigationBar.dropdown, 'dropdown')
      .click(navigationBar.dropdown)
      .pause(1000)
      .assert.visible(navigationBar.logout)
      .moveToElement(navigationBar.logout, 10, 10)
      .pause(2000)
      .click(navigationBar.logout);
  },
  'Signin fails with invalid credentials': (client) => {
    client
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
  'user  should be able to search for recipe': (client) => {
    client
      .url('http://localhost:50000/recipes')
      .pause(2000)
      .assert.visible(navigationBar.search, 'search')
      .moveToElement(navigationBar.search, 10, 10)
      .pause(1000)
      .setValue(navigationBar.search, 'recipe')
      .pause(1500)
      .submitForm(navigationBar.search)
      .pause(1000)
      .assert.visible(selectors.navigation.home)
      .moveToElement(selectors.navigation.home, 10, 10)
      .pause(1000)
      .click(selectors.navigation.home);
  },
  'Single recipe view page': (client) => {
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
  'user should view create new recipe': (client) => {
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
      .pause(2000);
  }
};

