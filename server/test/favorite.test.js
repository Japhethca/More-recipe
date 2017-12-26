import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


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
        ({ token } = res.body);
        done();
      });
  });

  it('should get all users favorite recipes', (done) => {
    chai.request(app)
      .get('/api/users/favorites')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('favorites');
        expect(res.body.favorites).to.be.instanceof(Array);
        done();
      });
  });

  it('should error when removing invalid recipe from favorites', (done) => {
    chai.request(app)
      .delete('/api/users/favorites/ere')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'invalid Url Parameter';
        done();
      });
  });

  it('should should remove recipe from favorites', (done) => {
    chai.request(app)
      .delete('/api/users/favorites/1')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe successfully removed from favorites';
        done();
      });
  });

  it('should error on removing recipe that does not exist', (done) => {
    chai.request(app)
      .delete('/api/users/favorites/1')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe with this id is not in favorites';
        done();
      });
  });

  it('should add recipe to favorites', (done) => {
    chai.request(app)
      .post('/api/users/favorites/1')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'Recipe Successfully added to favorites';
        done();
      });
  });

  it('should fail when adding recipe with invalid id', (done) => {
    chai.request(app)
      .post('/api/users/favorites/899')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'Recipe Successfully added to favorites';
        done();
      });
  });

  it('should fail when adding recipe that is already in favorites', (done) => {
    chai.request(app)
      .post('/api/users/favorites/1')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.eql('failed');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal = 'Recipe already in favorites';
        done();
      });
  });

  describe('favorites', () => {
    before((done) => {
      chai.request(app)
        .post('/api/users/signin')
        .send({
          email: 'ben10@gmail.com',
          password: 'ben10'
        })
        .end((err, res) => {
          ({ token } = res.body);
          done();
        });
    });

    it('should fail when user has no favorites', (done) => {
      chai.request(app)
        .get('/api/users/favorites')
        .query({ token })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.eql('failed');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal = 'User has no favorites';
          done();
        });
    });
  });
});
