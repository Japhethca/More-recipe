import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);

const { expect } = chai;

const token = 'yJhbGciOiNiIsIncCI6IkppZCI6MSwidXNlciI6Im';
describe('AUTHENTICATOR', () => {
  it('should not authenticate expired or invalid token', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .send({ token })
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message)
          .to.be.eqls('Authentication failed: expired/invalid token');
        done();
      });
  });

  it('should not authenticate user if no token is provided', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body.message)
          .to.be.eqls('failed! No token. Sign in to get one.');
        done();
      });
  });

  it(
    'should return 405 status when an unsupported HTTP method is used'
    , (done) => {
      chai.request(app)
        .get('/api/users/signin')
        .end((error, response) => {
          expect(response).to.have.status(405);
          expect(response.body.message)
            .to.be.eqls('Unsupported Request Method');
          done();
        });
    }
  );
});
