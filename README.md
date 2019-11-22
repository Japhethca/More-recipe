[![Coverage Status](https://coveralls.io/repos/github/JaphethCA/More-recipe/badge.svg)](https://coveralls.io/github/JaphethCA/More-recipe)
[![Build Status](https://travis-ci.org/JaphethCA/More-recipe.svg?branch=staging)](https://travis-ci.org/JaphethCA/More-recipe)
[![Maintainability](https://api.codeclimate.com/v1/badges/6fd950b5a00c5c1e492b/maintainability)](https://codeclimate.com/github/JaphethCA/More-recipe/maintainability)
[![codecov](https://codecov.io/gh/JaphethCA/More-recipe/branch/staging/graph/badge.svg)](https://codecov.io/gh/JaphethCA/More-recipe)
# More-recipes
More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt.
Suppose a user comes up with a recipe, he/she can post it on **More-Recipes** and get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Functionalities
With this app users can do the following:
#### Unauthenticated/Guest Users
- Create an account
- Sign in as a user

#### Authenticated Users
- View Recipes
- Create New recipe
- Update created recipes
- Delete recipe created
- Add recipes to their favorites list
- Upvote a recipe
- downvote a recipe
- Review a recipe
- Update profile 

### Technologies Used 
The following are some of the technologies used on this project.
- **[NodeJs](https://nodejs.org/en/)** | is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
- **[Express](https://expressjs.com/)** | is a web application framework for Node.js designed for building web applications and APIs.
- **[React/Redux](https://reactjs.org/)** | is a JavaScript library for building user interfaces.
- **[Wepack](https://webpack.js.org/)** | an application bundling tool.
- **[Babel](https://babeljs.io/)** | for transpilling ES6 or earlier version of javascript to older versions.
- **[Sequelize](https://www.npmjs.com/package/sequelize)** | An ORM framework for postgres database
- **[MaterializeCss](materializecss.com/)** | is a modern responsive CSS framework based on Material Design by Google.

### Coding Style
- **Airbnb**: is a coding style guide that guides developers to write clean codes.

### Getting Started
- Clone Repository by running `git clone https://github.com/JaphethCA/More-recipe.git`
- After that change directory to the repo with `cd More-recipe`
- Run `npm install` to install dependency packages
- Start App locally by running `npm start:dev`
- Then navigate to "http://localhost:50000" to view app in browser

### Tests
To test app:  
- You will have to create a separate test database and configure it as in .env.example file
- Run server side tests with `npm test`
- Run client side test with `npm run test:client`


### How to Contribute
- Clone this repository.
- branch out to feature/bug/chore
- work on feature/bug/chore
- Raise a pull request to the master branch with brief description of what it does

**Notes**: _Ensure your codes follow <a href="https://github.com/airbnb/javascript">AirBnB Javascript Styles Guide</a>_

###  Site Links
[More-recipe (Template)](https://japhethca.github.io/More-recipe/)

[More-recipe (Hosted on Heroku)](https://more-recipe-cj.herokuapp.com/)

[More-recipe (API Documentations)](https://more-recipe-cj.herokuapp.com/api/docs)

### License
This project is licensed under MIT License, see LICENSE for more info.
