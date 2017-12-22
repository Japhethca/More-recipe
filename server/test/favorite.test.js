import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';


chai.use(chaiHttp);

const { expect } = chai;

let token;


describe('FAVORITES', () => {
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
  it('should get all users favorite recipes', (done) => {
    chai.request(app)
      .get('/api/users/1/recipes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('Favorites');
        expect(res.body.Favorites).to.be.instanceof = 'array';
        done();
      });
  });
  it('should throw an error if user has no favorite', (done) => {
    chai.request(app)
      .get('/api/users/3/recipes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.message).to.be.eqls = 'User has no favorites';
        done();
      });
  });

  it('should not allow user to remove recipe with invalid recipe Id', (done) => {
    chai.request(app)
      .delete('/api/users/ere/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'invalid Url Parameter';
        done();
      });
  });

  it('should allow user to remove recipe from favorites', (done) => {
    chai.request(app)
      .delete('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe successfully removed from favorites';
        done();
      });
  });

  it('should allow user to remove recipe from favorites if the recipe does not exist', (done) => {
    chai.request(app)
      .delete('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe with this id is not in favorites';
        done();
      });
  });

  it('should allow users to add recipe to favorites', (done) => {
    chai.request(app)
      .post('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'Recipe Successfully added to favorites';
        done();
      });
  });

  it('should not allow user to add recipes with invalid id to the favorites', (done) => {
    chai.request(app)
      .post('/api/users/0/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'No recipe with that id exists';
        done();
      });
  });

  it('should should fail if string is supplied as url', (done) => {
    chai.request(app)
      .get('/api/users/n/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should not allow addding recipe that is already in favorites', (done) => {
    chai.request(app)
      .post('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'Recipe already in favorites';
        done();
      });
  });

  it('should be able to catch errors on invalid url params', (done) => {
    chai.request(app)
      .post('/api/users/ee/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Invalid recipeId in URL';
        done();
      });
  });
});
