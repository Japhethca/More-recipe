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
  it('should allow users to vote for a recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/2/upvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Upvoted';
        done();
      });
  });
  
  it('should allow users to unvote for a recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/2/upvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Unvoted';
        done();
      });
  });

  it('should not allow users to upvote recipe with an id less than 1', (done) => {
    chai.request(app)
      .put('/api/recipes/0/upvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe id does not exist';
        done();
      });
  });
  it('should not allow users to upvote recipe with an invalid id', (done) => {
    chai.request(app)
      .put('/api/recipes/300/downvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });


  it('should allow users to downvote for a recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/2/downvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Downvoted';
        done();
      });
  });
  
  it('should allow users to unvote for a downvoted recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/2/downvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Unvoted';
        done();
      });
  });

  it('should allow users to downvote  for an  Unvoted recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/2/downvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe Downvoted';
        done();
      });
  });

  it('should not allow users to upvote recipe with an id less than 1', (done) => {
    chai.request(app)
      .put('/api/recipes/-2/downvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.message).to.be.eql = 'Recipe id does not exist';
        done();
      });
  });
  it('should not allow users to downvote recipe with an invalid id', (done) => {
    chai.request(app)
      .put('/api/recipes/300/downvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should catch an unexpected params with 500 error', (done) => {
    chai.request(app)
      .put('/api/recipes/e/downvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should catch an unexpected params with 500 error', (done) => {
    chai.request(app)
      .put('/api/recipes/e/upvotes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

