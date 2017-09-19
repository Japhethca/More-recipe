import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;
const url = 'http://127.0.0.1:3000';


describe('Favorite Recipe Endpoint: ', () => {
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
      .send({'token' : token })
      .end((err, res) => {
        done();
      });
  });


  it('should add favorites to users', (done) => {
    chai.request(url)
      .post('/users/1/favorites')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should not add invalid recipe id as a favorite', (done) => {
    chai.request(url)
      .post('/users/1000/favorites')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'No recipe with that id exists';
        done();
      });
  });


  it('should get all users favorite recipes', (done) => {
    chai.request(url)
      .get('/users/1/recipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('Recipes');
        done();
      });
  });

  it('should display a not found message if user does not have any recipe', (done) => {
    chai.request(url)
      .get('/users/1/recipes')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'User does not have any favorites';
        done();
      });
  });
});
