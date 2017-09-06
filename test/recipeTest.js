import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;
describe('EndPoint /api/recipes', () => {
  it('Should list all recipes', (done) => {
    chai.request('http://127.0.0.1:8000')
      .get('/api/recipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).have.property('All recipes');
        expect(res.body['All recipes']).length.be.greaterThan = 0;
        done();
      });
  });
  it('should create new recipes', (done) => {
    chai.request('http://127.0.0.1:8000')
      .post('/api/recipes')
      .send({ name: 'ofe akwu recipes', description: 'this is how to prepare ofe akwu', direction: 'follow the procedure' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Recipe Created!';
        done();
      });
  });
  it('should not accept empty  value data', (done) => {
    chai.request('http://127.0.0.1:8000')
      .post('/api/recipes')
      .send({ name: 'ofe akwu recipes', description: 'this is how to prepare ofe akwu', direction: 'follow the procedure' })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Recipe name & ingredients must not be empty';
        done();
      });
  });
  it('should update created recipes', (done) => {
    chai.request('http://127.0.0.1:8000')
      .put('/api/recipes/12' )
      .send({ name: '', description: 'this is how to prepare ofe akwu', direction: '' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Recipe update Successful';
        done();
      });
  });
  it('should get recipe by id', (done) => {
    chai.request('http://127.0.0.1:8000')
      .get('/api/recipes/5')
      .end((err, res) => {
        expect(res, 'response should have a status code of 200').to.have.status(200);
        expect(res, 'response should be json').to.be.json;
        expect(res.body, 'body should have a property id').to.have.property('id');
        expect(res.body.id, 'id should be equal to 5').to.be.equal = 5;
        done();
      });
  });
  it('should not get recipe with invalid id', (done) => {
    chai.request('http://127.0.0.1:8000')
      .get('/api/recipes/6778')
      .end((err, res) => {
        expect(re, 'should have a 400 status code').to.have.status(400);
        expect(res, 'response should be json').to.be.json;
        expect(res.body).to.have.property('message')
        expect(res.body.message, 'message should be "Recipe does not exist"').to.be.equal = 'Recipe does not exist!';
        done();
      });
  });
  it('should get the review of a recipe by id', (done) => {
    chai.request('http://127.0.0.1:8000')
      .get('/api/recipes/5/reviews')
      .end((err, res) => {
        expect(res, 'should have status 200').to.have.status(200);
        expect(res, 'should be json').to.be.json;
        expect(res.body, 'should have a message property').to.have.property('message');
        expect(res.body, 'should have a property review').to.have.property('reviews');
        expect(res.body.reviews).to.not.be.null;
        done();
      });
  });
});
