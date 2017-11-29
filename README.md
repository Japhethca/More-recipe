[![Coverage Status](https://coveralls.io/repos/github/JaphethCA/More-recipe/badge.svg)](https://coveralls.io/github/JaphethCA/More-recipe)
[![Build Status](https://travis-ci.org/JaphethCA/More-recipe.svg?branch=staging)](https://travis-ci.org/JaphethCA/More-recipe)
[![Maintainability](https://api.codeclimate.com/v1/badges/6fd950b5a00c5c1e492b/maintainability)](https://codeclimate.com/github/JaphethCA/More-recipe/maintainability)
# More-recipe
More-Recipes​ ​provides​ ​a​ ​platform​ ​for​ ​users​ ​to​ ​share​ ​the​ ​awesome​ ​and​ ​exciting​ ​​ ​recipe​ ​ideas​ ​they have​ ​invented​ ​or​ ​learnt.
## Getting started
​Suppose​ ​a​ ​user​ ​comes​ ​up​ ​with​ ​a​ ​recipe,​ ​​ ​he/she​ ​can​ ​post​ ​it​ ​on
More-Recipes​ ​and​ ​​ ​get​ ​feedback​ ​in​ ​form​ ​of​ ​reviews​ ​and​ ​votes​ ​from​ ​other​ ​users​ ​who​ ​explore​ ​that
recipe.​ ​Users​ ​can​ ​also​ ​keep​ ​a​ ​list​ ​of​ ​their​ ​favorite​ ​recipes​ ​on​ ​the​ ​application.
## Technologies Used 
The following dependencies needs to be installed to run this app.
> NodeJs
> Express
> React/Redux
> Wepack
> Babel
> Sequelize 
> MaterializeCss

## How to Run/Start App
- Clone Repository by running `git clone [repository]`
- After that change directory to the repo with `cd More-recipe`
- Run `npm install` to dependencies
- Start App by running `npm start:dev`
- Then navigate to "http://localhost:50000" to view app in browser

## Running tests
App can be tested by running  
- `$ npm test`
 ***
## Rest API Endpoints
Api route for signing in and registration
POST​ :` /api/users/signup`

POST​ : `/api/users/signin`

API for modifying a recipe

PUT​ : `/api/recipes/<recipeId>`

API for adding recipe

POST​ : `/api/recipes`

API  for deleting recipe

DELETE​ : ` /api/recipes/<recipeId>`

API route for getting all recipe in app

GET​ : ` /api/recipes`

API route for posting a review for a recipe

POST​ : `/api/recipes/<recipeId>/reviews `

API route for getting all favorite recipes

GET​ : `/api/users/<userId>/recipes`

API Route for getting recipe with highest votes

GET​ : `/api/recipes?sort=upvotes&order=ascending`


###  Site Links
[More-recipe (Template)](https://japhethca.github.io/More-recipe/)

[More-recipe (Hosted on heroku)](https://more-recipe-cj.herokuapp.com/)

[More-recipe (API docs)](https://morerecipe.docs.apiary.io/#)

## Liecense
This project is licensed under MIT License, See LICENCE for more info.
