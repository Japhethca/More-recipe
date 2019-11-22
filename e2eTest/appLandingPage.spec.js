import faker from 'faker';
import selectors from './selectors';

const email = faker.internet.email();
const username = faker.internet.userName();

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
      .setValue(signup.usernameInput, 'john')
      .pause(1000)
      .assert.visible(signup.emailInput)
      .clearValue(signup.emailInput)
      .setValue(signup.emailInput, 'john@gmail.com')
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
      .click(navigationBar.logout)
      .pause(1000)
      .closeWindow();
  }
};

