import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';


chai.use(chaiHttp);

const expect = chai.expect;
const url = app;

describe('Review Recipe Endpoint: ', () => {
  const loginDetails = {
    email: 'chidexj@gmail.com',
    password: 'chidex4me'
  };
  let token;
  before((done) => {
    chai.request(url)
      .post('/api/users/signin')
      .send(loginDetails)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });


  beforeEach((done) => {
    chai.request(url)
      .post('/')
      .send({'token': token})
      .end((err, res) => {
        done();
      });
  });

  it('should allow users to review a recipe', (done) => {
    chai.request(url)
      .post('/recipes/1/reviews')
      .send(reviewData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Review Created';
        done();
      });
  });


  it('should allow not allow users to review a recipe that does not exist', (done) => {
    chai.request(url)
      .post('/recipes/1000/reviews')
      .send(reviewData)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Invalid recipe Id';
        done();
      });
  });

  it('should allow users to get reviews for a single recipe', (done) => {
    chai.request(url)
      .get('/recipes/1/reviews')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
