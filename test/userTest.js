import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);


const expect = chai.expect;

let signupData = {
  firstname: 'benjamin',
  lastname: 'anyigor',
  username: 'ben10',
  email: 'benjamanyigor@gmail.com',
  password: 'ben104real',
  comfirmPassword: 'ben104real'
};
let signinData = {
  email: 'benjaminanyigor@gmail.com',
  password: 'ben104real'
};


describe("Home", () => {
  before(done){
    chai.request(app)
      .post('/api/users/signin')
      .send({email:'chidexj@gmail.com', password: 'chidex4me'})
  }
  
  it('Should return 200 Ok on GET "/" ', (done) => {
    chai.request('http://127.0.0.1:3000')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 
        done();
      });
  });
  it('should not login non users', (done) => {
    chai.request('http://127.0.0.1:3000')
      .post('/api/users/signin')
      .send(signinData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property('message');
        expect(res.body.message).to.eql = 'Login Failed!';
        done();
      });
  });
});

describe('API /API/USERS/SIGNUP', () => {
  it('Should be able to sign up new users', (done) => {
    chai.request('http://127.0.0.1:3000')
      .post('/api/users/signup')
      .send(signupData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).have.property('message');
        expect(res.body.message).to.eql = 'Account Successfully created!';
        done();
      });
  });
  it('Should prevent users from creating new acount with the same details', (done) => {
    chai.request('http://127.0.0.1:3000')
      .post('/api/users/signup')
      .send(signupData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).have.property('message');
        expect(res.body.message).to.eql = 'User already exists';
        done();
      });
  });
  it('should prevent signed users from signing in again', (done) => {
    chai.request('http://127.0.0.1:3000')
      .post('/api/users/signup')
      .send({ email: 'mymail@.com', password: 'mymail', firstname:'youname',lastname:'myname',aboutme:'just me', username:'myname' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).have.property('message');
        expect(res.body.message).to.eql = 'User already exists';
        done();
      });
  });
});

