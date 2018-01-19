import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';


chai.use(chaiHttp);

const { expect } = chai;

let token;

describe('REVIEWS CONTROLLER', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'kelechi@gmail.com',
        password: 'kelechi'
      })
      .end((error, response) => {
        ({ token } = response.body);
        done();
      });
  });

  it('should return created review for a recipe', (done) => {
    chai.request(app)
      .post('/api/recipe/2/review')
      .send({ content: 'this is serious' })
      .query({ token })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('review');
        expect(response.body.message).to.be.eql('Review Added Successfully');
        expect(response.body.review).to.have.property('content');
        done();
      });
  });

  it(
    'should return 404 status when adding a review for recipe that does not exist'
    , (done) => {
      chai.request(app)
        .post('/api/recipe/200/review')
        .send({ content: 'this is serious' })
        .query({ token })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.have.property('message');
          expect(response.body.message)
            .to.be.eql('Recipe with this Id does not exist');
          done();
        });
    }
  );

  it('should return 400 when the "content" field is empty', (done) => {
    chai.request(app)
      .post('/api/recipe/2/review')
      .send({})
      .query({ token })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.have.property('message');
        done();
      });
  });

  it('should return all reviews for a single recipe', (done) => {
    chai.request(app)
      .get('/api/recipe/2/reviews')
      .query({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message)
          .to.be.eql('Recipe reviews successfully returned');
        expect(response.body).to.have.property('reviews');
        expect(response.body.count).to.be.greaterThan(0);
        done();
      });
  });

  it('should return 404 when there are no review for a recipe', (done) => {
    chai.request(app)
      .get('/api/recipe/3/reviews')
      .query({ token })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.eql('No reviews for this recipe');
        done();
      });
  });

  it('should return 400 when an invalid params is passed', (done) => {
    chai.request(app)
      .get('/api/recipe/esggsf/reviews')
      .query({ token })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message)
          .to.be.eql('Invalid URL parameter type, parameter must be a number');
        done();
      });
  });
});
