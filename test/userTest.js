import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';


chai.use(chaiHttp);
let expect = chai.expect;
let url = 'http://localhost:3000';

describe('User API', () => {
  it('should sign in user on /api/users/signin POST', (done) => {
    chai.request(url)
      .post('/api/users/signin')
      .send({email:'you@yourmail.com', password:'password'})
      .end((err,res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        rxpect(res.body).to.have.property('message');
        done();
      });
  });
  it('should register new users on /api/users/signup POST', (done) => {
    chai.request(url)
      .post('/api/users/signup')
      .send({firstname:'japheth', lastname:'anyigor',username:'japheth85',
          password:'password',email:'you@yourmail.com',aboutme:'just me'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done();
      })
  });
  it('should list users favorite recipe on /api/users/<usersId>/recipes GET', (done) => {
    chai.request(url)
      .get('/api/users/1/recipes')
      .end((err,res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.be.a('object');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('ingredients');
        done();
      })
  });
  it('should add favorites to user on /api/user/<recipeId>/favoirites POST', (done) => {
    chai.request(url)
      .post('/api/users/1/favorites')
      .end((err, res) => {  
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('SUCCESS');
        done();
      });
  });

})