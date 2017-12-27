import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);

const { expect } = chai;
let token;

describe('Recipes Endpoint', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ngozinwali@gmail.com',
        password: 'ngobest'
      })
      .end((err, res) => {
        ({ token } = res.body);
        done();
      });
  });

  describe('Getting All recipes', () => {
    it('should get all recipes in app', (done) => {
      chai.request(app)
        .get('/api/recipes')
        .send({ token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property('recipes');
          expect(res.body.recipes).length(3);
          expect(res.body.message).to.be.eql = 'All recipes:';
          done();
        });
    });

    it('should limit all recipes to one recipe', (done) => {
      chai.request(app)
        .get('/api/recipes?limit=1')
        .send({ token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property('recipes');
          expect(res.body.recipes).length(1);
          expect(res.body.message).to.be.eql = 'All recipes:';
          done();
        });
    });

    it('should return the first page of recipes', (done) => {
      chai.request(app)
        .get('/api/recipes?limit=2&page=1')
        .send({ token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property('recipes');
          expect(res.body.recipes).length(2);
          expect(res.body.message).to.be.eql = 'All recipes:';
          done();
        });
    });
  });

  describe('Sorting and Odering Recipes', () => {
    it('should should sort recipes by name in descending order', (done) => {
      chai.request(app)
        .get('/api/recipes?sort=name&order=descending')
        .send({ token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property('recipes');
          expect(res.body.recipes[0].name).to.eql = 'sausage yam';
          expect(res.body.message).to.be.eql = 'All recipes:';
          done();
        });
    });

    it('should should error on invalid query value', (done) => {
      chai.request(app)
        .get('/api/recipes?sort=me&order=up')
        .send({ token })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql = 'failed';
          done();
        });
    });
  });

  describe('Searching Recipes', () => {
    it('should find a recipe with "sausage"', (done) => {
      chai.request(app)
        .get('/api/recipes?search=sausage')
        .send({ token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property('recipes');
          expect(res.body.recipes[0].name).to.eql = 'sausage yam';
          expect(res.body.message).to.be.eql = 'All recipes:';
          done();
        });
    });

    it('should fail if no search is found for query', (done) => {
      chai.request(app)
        .get('/api/recipes?search=chocolate')
        .send({ token })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql = 'failed';
          done();
        });
    });
  });

  describe('Adding new recipe', () => {
    it('should create new recipe', (done) => {
      chai.request(app)
        .post('/api/recipe')
        .query({ token })
        .send({
          name: 'this is a new recipe',
          description: 'this is an afr soup',
          ingredients: 'magg',
          direction: 'first do then the other'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property = 'message';
          expect(res.body).to.have.property = 'updated';
          expect(res.body.message).to.be.eql = 'Recipe updated Successful';
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
          ingredients: 'magg',
          direction: 'first do then the other'
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property = 'message';
          expect(res.body.message).to.be.eql = 'Recipe with this name already exists';
          done();
        });
    });

    it('should should with any empty fields', (done) => {
      chai.request(app)
        .post('/api/recipe')
        .query({ token })
        .send({
          name: '',
          description: '',
          ingredients: 'magg',
          direction: 'first do then the other'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property = 'message';
          done();
        });
    });
  });

  describe('Getting single recipe', () => {
    it('should get single recipe by id', (done) => {
      chai.request(app)
        .get('/api/recipe/1')
        .send({ token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property = 'recipe';
          done();
        });
    });

    it('should error if recipe was not found', (done) => {
      chai.request(app)
        .get('/api/recipe/1233')
        .query({ token })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.eql = 'failed';
          done();
        });
    });

    it('should catch invalid url input', (done) => {
      chai.request(app)
        .get('/api/recipe/ere')
        .query({ token })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.eql = 'Invalid Url Parameter';
          done();
        });
    });
  });

  describe('Updating single recipe', () => {
    it('should allow users to update existing recipe', (done) => {
      chai.request(app)
        .put('/api/recipe/1')
        .query({ token })
        .send({
          name: 'new recipe name',
          description: 'this is an afr soup',
          ingredients: 'magg',
          direction: 'first do then the other'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property = 'message';
          expect(res.body).to.have.property = 'updated';
          expect(res.body.message).to.be.eql = 'Recipe updated Successful';
          done();
        });
    });

    it('should not allow users to update non existing recipe', (done) => {
      chai.request(app)
        .put('/api/recipe/300')
        .query({ token })
        .send({
          name: 'new recipe name',
          description: 'this is an afr soup',
          ingredients: 'magg',
          direction: 'first do then the other'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property = 'message';
          expect(res.body.message).to.be.eql = 'Recipe does not exist';
          done();
        });
    });

    it('should not allow users to update with an empty fields', (done) => {
      chai.request(app)
        .put('/api/recipe/300')
        .query({ token })
        .send({
          name: '',
          description: '',
          ingredients: 'magg',
          direction: 'first do then the other'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property = 'message';
          expect(res.body.message).to.be.eql = 'Recipe does not exist';
          done();
        });
    });

    it('should not allow users to update recipe that they didnt create', (done) => {
      chai.request(app)
        .put('/api/recipe/2')
        .query({ token })
        .send({
          name: 'new recipe name',
          description: 'this is an afr soup',
          ingredients: 'magg',
          direction: 'first do then the other'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property = 'message';
          expect(res.body.message).to.be.eql = 'User is not authorized to update this recipe!';
          done();
        });
    });

    it('should catch invalid url input', (done) => {
      chai.request(app)
        .put('/api/recipe/ere')
        .query({ token })
        .send({
          name: 'new recipe name',
          description: 'this is an afr soup',
          ingredients: 'magg',
          direction: 'first do then the other'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.eql = 'Invalid Url Parameter';
          done();
        });
    });
  });

  describe('GET user recipes', () => {
    it('should catch invalid url input', (done) => {
      chai.request(app)
        .get('/api/users/recipes')
        .query({ token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql = 'success';
          expect(res.body.message).to.be.eql = 'Successfully loaded users recipes';
          done();
        });
    });
  });

  describe('Deleting Recipe', () => {
    it('should be able to delete recipe user created', (done) => {
      chai.request(app)
        .delete('/api/recipe/1')
        .query({ token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql = 'success';
          expect(res.body).to.have.property = 'message';
          expect(res.body.message).to.be.eql = 'Recipe deleted successfully';
          done();
        });
    });

    it('should give error when deleting recipe that doesnt exist', (done) => {
      chai.request(app)
        .delete('/api/recipe/1')
        .query({ token })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.eql = 'Recipe does not exist';
          done();
        });
    });

    it('should not allow user to delete recipe he/she didnt create', (done) => {
      chai.request(app)
        .delete('/api/recipe/2')
        .query({ token })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.eql = 'User is not authorised to delete this recipe';
          done();
        });
    });

    it('should catch invalid url input', (done) => {
      chai.request(app)
        .delete('/api/recipe/ere')
        .query({ token })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql = 'failed';
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.eql = 'Invalid Url Parameter';
          done();
        });
    });
  });
});

