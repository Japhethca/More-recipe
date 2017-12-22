import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';


chai.use(chaiHttp);

const { expect } = chai;

let token;

describe('REVIEWS', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'kelechi@gmail.com',
        password: 'kelechi'
      })
      .end((err, res) => {
        token = res.body.Token;
        done();
      });
  });
  it('should allow getting all review in the application', (done) => {
    chai.request(app)
      .get('/api/reviews')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property = 'reviews';
        done();
      });
  });


  it('should allow user to post review on a recipe', (done) => {
    chai.request(app)
      .post('/api/recipes/2/reviews')
      .send({ content: 'this is serious' })
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property = 'message';
        expect(res.body).to.have.property = 'Review';
        expect(res.body.message).to.be.eql = 'Review Created';
        done();
      });
  });
  it('should now allow user to review an invalid recipe', (done) => {
    chai.request(app)
      .post('/api/recipes/200/reviews')
      .send({ content: 'this is serious' })
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe with this Id does not exist';
        done();
      });
  });

  it('should error if inputs are empty', (done) => {
    chai.request(app)
      .post('/api/recipes/2/reviews')
      .send({})
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should allow users to be able to see the recipes that he added', (done) => {
    chai.request(app)
      .get('/api/recipes/2/reviews')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe Reviews';
        expect(res.body).to.have.property('Reviews');
        done();
      });
  });
  it('should return an error message if recipe has no reviews', (done) => {
    chai.request(app)
      .get('/api/recipes/3/reviews')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'No reviews for this recipe';
        done();
      });
  });
  it('should error on non number in url params', (done) => {
    chai.request(app)
      .get('/api/recipes/esggsf/reviews')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Invalid Url Parameter';
        done();
      });
  });
  it('should error on non number in url params', (done) => {
    chai.request(app)
      .post('/api/recipes/esggsf/reviews')
      .send({ content: 'this is serious' })
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Invalid Url Parameter';
        done();
      });
  });
});
