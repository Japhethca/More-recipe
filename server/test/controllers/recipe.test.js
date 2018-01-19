import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';


chai.use(chaiHttp);

const { expect } = chai;
let token;

describe('RECIPES >>', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ngozinwali@gmail.com',
        password: 'ngobest'
      })
      .end((error, response) => {
        ({ token } = response.body);
        done();
      });
  });

  describe('RECIPES CONTROLLER', () => {
    it('should return all recipes', (done) => {
      chai.request(app)
        .get('/api/recipes')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('status');
          expect(response.body.status).to.eql = 'success';
          expect(response.body).to.have.property('recipes');
          expect(response.body.recipes).length(3);
          expect(response.body.message)
            .to.be.eql('Successfully returned recipes');
          done();
        });
    });

    it('should limit returned recipes to one', (done) => {
      chai.request(app)
        .get('/api/recipes?limit=1')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('status');
          expect(response.body.status).to.eql = 'success';
          expect(response.body).to.have.property('recipes');
          expect(response.body.recipes).length(1);
          expect(response.body.message)
            .to.be.eql('Successfully returned recipes');
          done();
        });
    });

    it('should return all the recipe in the first page', (done) => {
      chai.request(app)
        .get('/api/recipes?limit=2&page=1')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('status');
          expect(response.body.status).to.eql = 'success';
          expect(response.body).to.have.property('recipes');
          expect(response.body.recipes).length(2);
          expect(response.body.message)
            .to.be.eql('Successfully returned recipes');
          done();
        });
    });
  });

  describe('RECIPES SORT CONTROLLER', () => {
    it('should return sorted recipes by name in descending order', (done) => {
      chai.request(app)
        .get('/api/recipes?sort=name&order=descending')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.status).to.eql('success');
          expect(response.body).to.have.property('recipes');
          expect(response.body.message)
            .to.be.eql('Recipes successfully sorted');
          expect(response.body.count).to.be.greaterThan(0);
          done();
        });
    });

    it(
      'should return 400 status when an invalid query type is passed',
      (done) => {
        chai.request(app)
          .get('/api/recipes?sort=me&order=up')
          .send({ token })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body.status).to.eql('failed');
            expect(response.body.message)
              .to.be.eql('Request query was not understood');
            done();
          });
      }
    );
  });

  describe('RECIPES SEARCH CONTROLLER', () => {
    it('should return all recipes that matches "sausage"', (done) => {
      chai.request(app)
        .get('/api/recipes?search=sausage')
        .send({ token })
        .end((error, resonse) => {
          expect(resonse).to.have.status(200);
          expect(resonse.body.status).to.eql('success');
          expect(resonse.body).to.have.property('recipes');
          expect(resonse.body.recipes[0].name).to.eql('Sausage yam');
          expect(resonse.body.message).to.be.eql('Search successful');
          done();
        });
    });

    it('should return 404 if no result was found for a query', (done) => {
      chai.request(app)
        .get('/api/recipes?search=chocolate')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.status).to.eql('failed');
          expect(response.body.message).to.be.equal('Recipe not found');
          done();
        });
    });
  });

  describe('RECIPES CREATE CONTROLLER', () => {
    it('should successfully create new recipe', (done) => {
      chai.request(app)
        .post('/api/recipe')
        .query({ token })
        .send({
          name: 'this is a new recipe',
          description: 'this is an afr soup',
          ingredients: 'maggi',
          direction: 'first do then the other'
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.status).to.eql('success');
          expect(response.body).to.have.property('message');
          expect(response.body).to.have.property('recipe');
          expect(response.body.message).to.be.eql('Recipe successfully created');
          done();
        });
    });

    it('should not create recipe with name that already exist', (done) => {
      chai.request(app)
        .post('/api/recipe')
        .query({ token })
        .send({
          name: 'this is a new recipe',
          description: 'this is an afr soup',
          ingredients: 'maggi',
          direction: 'first do then the other'
        })
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body.status).to.eql('failed');
          expect(response.body).to.have.property('message');
          expect(response.body.message)
            .to.be.eql('You have already created a recipe with this name before');
          done();
        });
    });

    it('should return 400 status when a required field is empty', (done) => {
      chai.request(app)
        .post('/api/recipe')
        .query({ token })
        .send({
          name: '',
          description: '',
          ingredients: 'maggi',
          direction: 'first do then the other'
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.status).to.eql('failed');
          expect(response.body).to.have.property('message');
          done();
        });
    });
  });

  describe('SINGLE RECIPE CONTROLLER', () => {
    it('should successfully return a recipe with requested id', (done) => {
      chai.request(app)
        .get('/api/recipe/1')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.status).to.eql('success');
          expect(response.body).to.have.property('recipe');
          expect(response.body.message)
            .to.be.equal('Recipe returned successfully');
          expect(response.body.recipe.id).to.eq(1);
          done();
        });
    });

    it('should return 404 when recipe does not exist', (done) => {
      chai.request(app)
        .get('/api/recipe/123344')
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.have.property('status');
          expect(response.body.message).to.be.eql('Recipe does not exist!');
          expect(response.body.status).to.be.equal('failed');
          done();
        });
    });

    it(
      'should return 400 when an invalid request parameter type is passed in',
      (done) => {
        chai.request(app)
          .get('/api/recipe/ere')
          .query({ token })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body.status).to.eql('failed');
            expect(response.body).to.have.property('message');
            expect(response.body.message)
              .to.be
              .eql('Invalid URL parameter type, parameter must be a number');
            done();
          });
      }
    );
  });

  describe('RECIPE UPDATE CONTROLLER ', () => {
    it('should successfully update an existing recipe', (done) => {
      chai.request(app)
        .put('/api/recipe/1')
        .query({ token })
        .send({
          name: 'Ogbono soup',
          description: 'Is an african soup',
          ingredients: 'ogbono',
          direction: 'just cook it'
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.status).to.eql('success');
          expect(response.body).to.have.property('message');
          expect(response.body).to.have.property('recipe');
          expect(response.body.message).to.be.eql('Recipe updated Successfully');
          done();
        });
    });

    it(
      'should return 404 when updating recipe that does not exist',
      (done) => {
        chai.request(app)
          .put('/api/recipe/300')
          .query({ token })
          .send({
            name: 'new recipe name',
            description: 'this is an afr soup',
            ingredients: 'maggi',
            direction: 'first do then the other'
          })
          .end((error, response) => {
            expect(response).to.have.status(404);
            expect(response.body.status).to.eql('failed');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.eql('Recipe does not exist');
            done();
          });
      }
    );

    it(
      'should return 400 when updating recipe with an empty required field',
      (done) => {
        chai.request(app)
          .put('/api/recipe/300')
          .query({ token })
          .send({
            name: '',
            description: '',
            ingredients: 'maggi',
            direction: 'first do then the other'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body.status).to.eql('failed');
            expect(response.body).to.have.property('message');
            done();
          });
      }
    );

    it(
      'should return 401 status when a user tries to update another users recipe',
      (done) => {
        chai.request(app)
          .put('/api/recipe/2')
          .query({ token })
          .send({
            name: 'new recipe name',
            description: 'this is an African soup',
            ingredients: 'maggi',
            direction: 'just cook it'
          })
          .end((error, response) => {
            expect(response).to.have.status(401);
            expect(response.body.status).to.eql('failed');
            expect(response.body).to.have.property('message');
            expect(response.body.message)
              .to.be.eql('You are not authorized to update this recipe!');
            done();
          });
      }
    );

    it(
      'should return 400 status when an invalid url parameter is passed',
      (done) => {
        chai.request(app)
          .put('/api/recipe/ere')
          .query({ token })
          .send({
            name: 'new recipe name',
            description: 'this is an africa soup',
            ingredients: 'maggi',
            direction: 'first do then the other'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body.status).to.eql('failed');
            expect(response.body).to.have.property('message');
            expect(response.body.message)
              .to.be
              .eql('Invalid URL parameter type, parameter must be a number');
            done();
          });
      }
    );
  });

  describe('USER RECIPES CONTROLLER', () => {
    it('should return all recipes created by user', (done) => {
      chai.request(app)
        .get('/api/users/recipes')
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.status).to.eql('success');
          expect(response.body.message)
            .to.be.eql('Successfully loaded users recipes');
          expect(response.body.count).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe('DELETE RECIPE CONTROLLER', () => {
    it('should delete a single recipe a user created', (done) => {
      chai.request(app)
        .delete('/api/recipe/1')
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.status).to.eql('success');
          expect(response.body).to.have.property('message');
          expect(response.body.message)
            .to.be.eql('Recipe deleted successfully');
          done();
        });
    });

    it(
      'should return 404 when deleting a recipe that does not exist',
      (done) => {
        chai.request(app)
          .delete('/api/recipe/1')
          .query({ token })
          .end((error, response) => {
            expect(response).to.have.status(404);
            expect(response.body.status).to.eql('failed');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.eql('Recipe does not exist');
            done();
          });
      }
    );

    it(
      'should return 401 when user attempts to delete a recipe not created',
      (done) => {
        chai.request(app)
          .delete('/api/recipe/2')
          .query({ token })
          .end((error, response) => {
            expect(response).to.have.status(401);
            expect(response.body.status).to.eql('failed');
            expect(response.body).to.have.property('message');
            expect(response.body.message)
              .to.be.eql('You are not authorised to delete this recipe');
            done();
          });
      }
    );

    it('should return 400 when an invalid params is used', (done) => {
      chai.request(app)
        .delete('/api/recipe/ere')
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.status).to.eql('failed');
          expect(response.body).to.have.property('message');
          expect(response.body.message)
            .to.be.eql('Invalid URL parameter type, parameter must be a number');
          done();
        });
    });
  });
});

