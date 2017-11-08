import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';


chai.use(chaiHttp);

const { expect } = chai;

let token = 'yJhbGciOiNiIsIncCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6Im';
describe('Authenications', () => {
  it('should not authenticate expired or invalid token', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.eqls = 'Authentication failed!';
        done();
      });
  });

  it('should not authenticate if no token is provided', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.eqls = 'failed! No token. Sign in to get one.';
        done();
      });
  });

  it('should error on invalid HTTP Method', (done) => {
    chai.request(app)
      .get('/api/users/signin')
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(405);
        expect(res.body.message).to.be.eqls = 'failed! No token. Sign in to get one.';
        done();
      });
  });
});
