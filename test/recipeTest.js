import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';


chai.use(chaiHttp);

const { expect } = chai;

const url = app;
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

  it('should get all recipes in app', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
