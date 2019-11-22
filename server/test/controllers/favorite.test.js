import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';


chai.use(chaiHttp);

const { expect } = chai;

let token;


describe('FAVORITES CONTROLLER', () => {
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

  it('should return all users favorite recipes', (done) => {
    chai.request(app)
      .get('/api/users/favorites')
      .send({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('favorites');
        expect(response.body.favorites).to.be.instanceof(Array);
        expect(response.body.count).to.be.greaterThan(0);
        expect(response.body.message)
          .to.equal('Favorite recipes successfully loaded');
        done();
      });
  });

  it(
    'should return 400 status when removing a ' +
      'recipe with a string Id'
    , (done) => {
      chai.request(app)
        .delete('/api/users/favorites/ere')
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.have.property('message');
          expect(response.body.message)
            .to.be.eql('Invalid URL parameter type, parameter must be a number');
          done();
        });
    }
  );

  it('should successfully remove a single recipe from favorites', (done) => {
    chai.request(app)
      .delete('/api/users/favorites/1')
      .query({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message)
          .to.be.eql('Recipe successfully removed from favorites');
        done();
      });
  });

  it(
    'should return 404 status when removing recipe that does not exist',
    (done) => {
      chai.request(app)
        .delete('/api/users/favorites/1')
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.have.property('message');
          expect(response.body.message)
            .to.be.eql('Recipe with this id is not in favorites');
          done();
        });
    }
  );

  it('should successfully add a recipe to favorites', (done) => {
    chai.request(app)
      .post('/api/users/favorites/1')
      .query({ token })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message');
        expect(response.body.message)
          .to.equal('Recipe Successfully added to favorites');
        done();
      });
  });

  it(
    'should return 404 status when adding recipe with id that does not exist',
    (done) => {
      chai.request(app)
        .post('/api/users/favorites/899')
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('Recipe does not exist');
          done();
        });
    }
  );

  it(
    'should return 409 status when adding recipe that is already in favorites',
    (done) => {
      chai.request(app)
        .post('/api/users/favorites/1')
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body.status).to.be.eql('failed');
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('Recipe already in favorites');
          done();
        });
    }
  );

  describe('Favorite controller', () => {
    before((done) => {
      chai.request(app)
        .post('/api/users/signin')
        .send({
          email: 'ben10@gmail.com',
          password: 'ben10'
        })
        .end((error, response) => {
          ({ token } = response.body);
          done();
        });
    });

    it(
      'should return 404 status when user has no favorite recipes ',
      (done) => {
        chai.request(app)
          .get('/api/users/favorites')
          .query({ token })
          .end((error, response) => {
            expect(response).to.have.status(404);
            expect(response.body.status).to.be.eql('failed');
            expect(response.body).to.have.property('message');
            expect(response.body.message)
              .to.equal('You do not have favorite recipes');
            done();
          });
      }
    );
  });
});
