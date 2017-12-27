import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


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
        ({ token } = res.body);
        done();
      });
  });

  it('should allow users to vote for a recipe', (done) => {
    chai.request(app)
      .put('/api/recipe/2/upvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Upvoted';
        done();
      });
  });

  it('should allow users to unvote for a recipe', (done) => {
    chai.request(app)
      .put('/api/recipe/2/upvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Unvoted';
        done();
      });
  });

  it('should not allow users to upvote recipe with an id less than 1', (done) => {
    chai.request(app)
      .put('/api/recipe/0/upvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe id does not exist';
        done();
      });
  });

  it('should not allow users to upvote recipe with an invalid id', (done) => {
    chai.request(app)
      .put('/api/recipe/300/downvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });


  it('should allow users to downvote for a recipe', (done) => {
    chai.request(app)
      .put('/api/recipe/2/downvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Downvoted';
        done();
      });
  });

  it('should allow users to unvote for a downvoted recipe', (done) => {
    chai.request(app)
      .put('/api/recipe/2/downvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Unvoted';
        done();
      });
  });

  it('should allow users to downvote  for an  Unvoted recipe', (done) => {
    chai.request(app)
      .put('/api/recipe/2/downvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Downvoted';
        done();
      });
  });

  it('should not allow users to downvote recipe with an invalid id', (done) => {
    chai.request(app)
      .put('/api/recipe/300/downvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should catch invalid url parameter', (done) => {
    chai.request(app)
      .put('/api/recipe/edf/downvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'invalid Url Parameter';
        done();
      });
  });

  it('should catch invalid url parameter', (done) => {
    chai.request(app)
      .put('/api/recipe/e/upvote')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'invalid Url Parameter';
        done();
      });
  });
});

