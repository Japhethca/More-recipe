module.exports = {
  landingPage: {
    homeLink: 'div.landing-image div:nth-child(1) nav.nav-extended.nav-menu div.nav-wrapper div.container-fluid > a.brand-logo:nth-child(1)',
    signupLink: 'div.landing-image nav.nav-extended.nav-menu div.nav-wrapper div.container-fluid div:nth-child(3) ul.nav-mobile.right.hide-on-small-only li:nth-child(2) > a.nav-btn',
    loginLink: 'div.landing-image nav.nav-extended.nav-menu div.nav-wrapper div.container-fluid div:nth-child(3) ul.nav-mobile.right.hide-on-small-only li:nth-child(1) > a.nav-btn',
    signupButton: 'div.landing-image div.wrapper:nth-child(2) div.authenticate div:nth-child(2) > a.landing-btn:nth-child(1)',
    loginButton: 'div.landing-image div.wrapper:nth-child(2) div.authenticate div:nth-child(2) > a.landing-btn:nth-child(2)',
    quote: 'div:nth-child(1) div:nth-child(1) div.landing-image div.wrapper:nth-child(2) > div.quote-text',
    footer: 'div:nth-child(1) div.landing-image div:nth-child(3) footer.page-footer > p.footer-copyright'
  },
  loginPage: {
    loginHeading: 'div.header-text:nth-child(1) > h4:nth-child(1)',
    emailInput: 'form:nth-child(3) div.input-field.col.s12.m12:nth-child(1) div:nth-child(1) > input:nth-child(2)',
    passwordInput: 'form:nth-child(3) div.input-field.col.s12.m12:nth-child(2) div:nth-child(1) > input:nth-child(2)',
    submitButton: 'form:nth-child(3) div.input-field.col.s12:nth-child(3) > button.btn-large.auth-btn',
    signupLink: 'form:nth-child(3) div.input-field.col.s12:nth-child(3) > button.btn-large.auth-btn'
  },
  signupPage: {
    header: 'div.header-text:nth-child(1) > h4:nth-child(1)',
    usernameInput: 'form:nth-child(3) div.input-field.col.s12:nth-child(1) div:nth-child(1) > input:nth-child(2)',
    emailInput: 'form:nth-child(3) div.input-field.col.s12:nth-child(2) div:nth-child(1) > input:nth-child(2)',
    passwordInput: 'form:nth-child(3) div.input-field.col.s12:nth-child(3) div:nth-child(1) > input:nth-child(2)',
    comfirmPasswordInput: 'form:nth-child(3) div.input-field.col.s12:nth-child(4) div:nth-child(1) > input:nth-child(2)',
    registerButton: 'form:nth-child(3) div.input-field.col.s12:nth-child(5) > button.btn-large.auth-btn',
    loginLink: 'form:nth-child(3) div.input-field.col.s12:nth-child(5) > button.btn-large.auth-btn'
  },
  navigation: {
    home: ' div.container-fluid > a.brand-logo',
    dropdown: 'a.dropdown-button',
    createRecipe: 'ul.dropdown-content.active li:nth-child(1) > a:nth-child(1)',
    profile: 'ul.dropdown-content.active li:nth-child(2) > a:nth-child(1)',
    userRecipes: 'div.wrapper nav.nav-extended.nav-menu div.nav-wrapper div.container-fluid ul.nav-mobile.hide-on-small-only.right:nth-child(2) li:nth-child(3) ul.dropdown-content.active li:nth-child(3) > a:nth-child(1)',
    favorites: 'div.wrapper nav.nav-extended.nav-menu div.nav-wrapper div.container-fluid ul.nav-mobile.hide-on-small-only.right:nth-child(2) li:nth-child(3) ul.dropdown-content.active li:nth-child(4) > a:nth-child(1)',
    logout: 'ul.dropdown-content.active li:nth-child(5) > button:nth-child(1)',
    search: 'form div input#search'
  },
  dashboard: {
    myRecipes: 'ul.side-bar-link:nth-child(2) li:nth-child(1) > a:nth-child(1)',
    favorites: 'ul.side-bar-link:nth-child(2) li:nth-child(2) > a:nth-child(1)',
    logout: 'ul.side-bar-link:nth-child(2) li:nth-child(4) > a:nth-child(1)',
    createRecipe: 'div.wrapper div.container div.row:nth-child(2) div.col.s12.m3.l3.sidebar.hide-on-small-only:nth-child(1) ul.side-bar-link:nth-child(2) li:nth-child(3) > a:nth-child(1)'
  },
  profile: {
    button: 'div.wrapper div.container div:nth-child(1) div.profile-cover div.row div.col.s12.m6.l8.details:nth-child(2) > a.modal-trigger.btn.blue:nth-child(5)',
    updateButton: 'div.wrapper div.container div.modal.open div.row div.col.s12.m12 form:nth-child(3) > button.btn.blue:nth-child(4)',
    finishButton: 'div.wrapper div.container div.modal.open div.row div.col.s12.m12 form:nth-child(3) > button.btn.grey.right:nth-child(5)',
    firstname: 'div.wrapper div.container div.modal.open div.row div.col.s12.m12 form:nth-child(3) div.input-field.col.s12:nth-child(1) > input:nth-child(1)',
    lastname: 'div.wrapper div.container div.modal.open div.row div.col.s12.m12 form:nth-child(3) div.input-field.col.s12:nth-child(2) > input:nth-child(1)',
    aboutme: 'div.wrapper div.container div.modal.open div.row div.col.s12.m12 form:nth-child(3) div.input-field.col.s12:nth-child(3) > input:nth-child(1)'
  },
  review: {
    reviews: 'div.wrapper div:nth-child(1) div.recipe-details.container div.reviews-page:nth-child(4) div.review-list > h4:nth-child(1)',
    reviewInput: 'div.wrapper div.recipe-details.container div.reviews-page:nth-child(4) form.review-form div.review-input:nth-child(1) > textarea:nth-child(1)',
    submitButton: 'div.wrapper div.recipe-details.container div.reviews-page:nth-child(4) form.review-form div:nth-child(2) > button.btn-class'
  },
  buttons: {
    favoriteButton: 'ul.btn-list li:nth-child(4) div.action-btns > button:nth-child(1)',
    upvoteButton: 'ul.btn-list li:nth-child(2) div.action-btns > button:nth-child(1)',
    downvoteButton: 'ul.btn-list li:nth-child(3) div.action-btns > button:nth-child(1)'
  },
  recipe: '#main div ul:first-child li:first-of-type a',
  recipeForm: {
    name: 'div.wrapper div.wrapper.row div.card.col.s12.m8.offset-m2.l8-offset-l2 form:nth-child(2) div.input-field.col.s12.text-field:nth-child(1) > input:nth-child(1)',
    description: 'div.wrapper div.wrapper.row div.card.col.s12.m8.offset-m2.l8-offset-l2 form:nth-child(2) div.input-field.col.s12.text-field:nth-child(2) > input:nth-child(1)',
    ingredients: '#ingredients iframe',
    direction: '#direction iframe',
    submitButton: 'div.wrapper div.wrapper.row div.card.col.s12.m8.offset-m2.l8-offset-l2 form:nth-child(2) div.input-btn:nth-child(7) > button.submit-btn.waves-effect.waves-ripple'
  }
};

