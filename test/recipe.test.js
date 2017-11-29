import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';


chai.use(chaiHttp);

const { expect } = chai;
let token;

describe('Recipes', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ngozinwali@gmail.com',
        password: 'ngobest'
      })
      .end((err, res) => {
        token = res.body.Token;
        done();
      });
  });
  it('should get all recipes in app', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('List');
        expect(res.body.message).to.be.eql = 'Successful';
        done();
      });
  });
  it('should get single recipe by id', (done) => {
    chai.request(app)
      .get('/api/recipes/1')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property = 'recipe';
        done();
      });
  });
  it('should give error when accessing recipe that doesnt exist', (done) => {
    chai.request(app)
      .get('/api/recipes/1233')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe does not exist!';
        done();
      });
  });
  it('should catch invalid url input', (done) => {
    chai.request(app)
      .get('/api/recipes/ere')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Invalid Url Parameter';
        done();
      });
  });

  it('should create new recipe', (done) => {
    chai.request(app)
      .post('/api/recipes')
      .query({ token })
      .send({
        name: 'this is a new recipe',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property = 'message';
        expect(res.body).to.have.property = 'updated';
        expect(res.body.message).to.be.eql = 'Recipe updated Successful';
        done();
      });
  });
  it('should not create recipe with name that already exist', (done) => {
    chai.request(app)
      .post('/api/recipes')
      .query({ token })
      .send({
        name: 'this is a new recipe',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eql = 'Recipe with this name already exists';
        done();
      });
  });
  it('should should with any empty fields', (done) => {
    chai.request(app)
      .post('/api/recipes')
      .query({ token })
      .send({
        name: '',
        description: '',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property = 'message';
        done();
      });
  });
  it('should allow users to update existing recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/1')
      .query({ token })
      .send({
        name: 'new recipe name',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property = 'message';
        expect(res.body).to.have.property = 'updated';
        expect(res.body.message).to.be.eql = 'Recipe updated Successful';
        done();
      });
  });
  it('should not allow users to update non existing recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/300')
      .query({ token })
      .send({
        name: 'new recipe name',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eql = 'Recipe does not exist';
        done();
      });
  });
  it('should not allow users to update with an empty fields', (done) => {
    chai.request(app)
      .put('/api/recipes/300')
      .query({ token })
      .send({
        name: '',
        description: '',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eql = 'Recipe does not exist';
        done();
      });
  });
  it('should not allow users to update recipe that they didnt create', (done) => {
    chai.request(app)
      .put('/api/recipes/2')
      .query({ token })
      .send({
        name: 'new recipe name',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eql = 'User is not authorized to update this recipe!';
        done();
      });
  });
  it('should catch invalid url input', (done) => {
    chai.request(app)
      .put('/api/recipes/ere')
      .query({ token })
      .send({
        name: 'new recipe name',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Invalid Url Parameter';
        done();
      });
  });
  it('should be able to delete recipe user created', (done) => {
    chai.request(app)
      .delete('/api/recipes/1')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eql = 'Recipe deleted successfully';
        done();
      });
  });
  it('should give error when deleting recipe that doesnt exist', (done) => {
    chai.request(app)
      .delete('/api/recipes/1')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe does not exist';
        done();
      });
  });
  it('should not allow user to delete recipe he didnt create', (done) => {
    chai.request(app)
      .delete('/api/recipes/2')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'User is not authorised to delete this recipe';
        done();
      });
  });

  it('should catch invalid url input', (done) => {
    chai.request(app)
      .delete('/api/recipes/ere')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Invalid Url Parameter';
        done();
      });
  });
});

