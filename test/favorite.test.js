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
        expect(res).to.be.json;
        expect(res.body).to.have.property('Favorites');
        done();
      });
  });
  it('should error is user has no favorite', (done) => {
    chai.request(app)
      .get('/api/users/3/recipes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.message).to.be.eqls = 'User has no favorites';
        done();
      });
  });

  it('should allow user to remove recipe from favorites', (done) => {
    chai.request(app)
      .delete('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should allow user to remove recipe from favorites if the recipe does not exist', (done) => {
    chai.request(app)
      .delete('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should allow users to add recipe to favorites', (done) => {
    chai.request(app)
      .post('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
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
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'No recipe with that id exists';
        done();
      });
  });

  it('should should fail if string is supplied as url', (done) => {
    chai.request(app)
      .post('/api/users/n/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should not allow addding recipes that is already in favorites', (done) => {
    chai.request(app)
      .post('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'Recipe already in favorites';
        done();
      });
  });
  it('should not allow addding recipe that is already in favorites', (done) => {
    chai.request(app)
      .post('/api/users/1/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'Recipe already in favorites';
        done();
      });
  });

  it('should be able to catch errors on string url params', (done) => {
    chai.request(app)
      .post('/api/users/e/favorites')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
