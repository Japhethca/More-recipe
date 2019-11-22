import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';


chai.use(chaiHttp);

const { expect } = chai;

let token;


describe('VOTES CONTROLLER', () => {
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

  it('should successfully upvote a recipe', (done) => {
    chai.request(app)
      .put('/api/recipe/2/upvote')
      .send({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.eql('Recipe Upvoted');
        done();
      });
  });

  it('should successfully unvote an upvoted recipe', (done) => {
    chai.request(app)
      .put('/api/recipe/2/upvote')
      .send({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Recipe unvoted');
        done();
      });
  });

  it(
    'should return 404 status when upvoting a recipe with id that doesnt exist',
    (done) => {
      chai.request(app)
        .put('/api/recipe/0/upvote')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('Recipe does not exist!');
          done();
        });
    }
  );


  it('should successfully downvote a recipe', (done) => {
    chai.request(app)
      .put('/api/recipe/2/downvote')
      .send({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Recipe Downvoted');
        done();
      });
  });

  it('should unvote a recipe that has been downvoted', (done) => {
    chai.request(app)
      .put('/api/recipe/2/downvote')
      .send({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Recipe Unvoted');
        done();
      });
  });

  it('should unvote an upvoted recipe when downvoted', (done) => {
    chai.request(app)
      .put('/api/recipe/2/downvote')
      .send({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Recipe Downvoted');
        done();
      });
  });

  it(
    'should return 404 when downvoting a recipe with an id that does not exist',
    (done) => {
      chai.request(app)
        .put('/api/recipe/300/downvote')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.be.eq('Recipe does not exist!');
          done();
        });
    }
  );

  it(
    'should return 400 status when a string is passed as a recipe ' +
    'id in url during downvote'
    , (done) => {
      chai.request(app)
        .put('/api/recipe/edf/downvote')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.have.property('message');
          expect(response.body.message)
            .to.be.eql('Invalid URL parameter type, parameter must be a number');
          done();
        });
    }
  );

  it(
    'should return 400 status when a string is passed as a recipe id ' +
    'in url during upvote',
    (done) => {
      chai.request(app)
        .put('/api/recipe/e/upvote')
        .send({ token })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.have.property('message');
          expect(response.body.message)
            .to.be.eql('Invalid URL parameter type, parameter must be a number');
          done();
        });
    }
  );
});

