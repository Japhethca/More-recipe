[![Coverage Status](https://coveralls.io/repos/github/JaphethCA/More-recipe/badge.svg?branch=staging)](https://coveralls.io/github/JaphethCA/More-recipe?branch=staging)
[![Build Status](https://travis-ci.org/JaphethCA/More-recipe.svg?branch=staging)](https://travis-ci.org/JaphethCA/More-recipe)
[![Code Climate](https://codeclimate.com/github/JaphethCA/More-recipe/badges/gpa.svg)](https://codeclimate.com/github/JaphethCA/More-recipe)
# More-recipe
More-Recipes​ ​provides​ ​a​ ​platform​ ​for​ ​users​ ​to​ ​share​ ​the​ ​awesome​ ​and​ ​exciting​ ​​ ​recipe​ ​ideas​ ​they have​ ​invented​ ​or​ ​learnt.
## Getting started
​Suppose​ ​a​ ​user​ ​comes​ ​up​ ​with​ ​a​ ​recipe,​ ​​ ​he/she​ ​can​ ​post​ ​it​ ​on
More-Recipes​ ​and​ ​​ ​get​ ​feedback​ ​in​ ​form​ ​of​ ​reviews​ ​and​ ​votes​ ​from​ ​other​ ​users​ ​who​ ​explore​ ​that
recipe.​ ​Users​ ​can​ ​also​ ​keep​ ​a​ ​list​ ​of​ ​their​ ​favorite​ ​recipes​ ​on​ ​the​ ​application.
## Requirements
The following dependencies needs to be installed to run this app.
> NodeJs

> Express

> Babel

## How to Run App
Clone app from github by running 

`$ git clone` 

install the latest version of node.js and express

`$ npm install nodejs`

`$ npm install express
`

optional - for transpilling ES6 to ES5

`$ npm install babel`

The app can be started from the command line by running 

`$ npm start:app`

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

## Running the tests
The for this app is written in mocha and chai which can be run by simple typing 
$ npm run test
or 
$ npm run mocha --compilers js:babel-register


###  Site Links
[More-recipe (Template)](https://japhethca.github.io/More-recipe/)

[More-recipe (Hosted on heroku)](https://more-recipe-cj.herokuapp.com/)

[More-recipe (API docs)](http://docs.anyigorchidieberejapheth.apiary.io)
