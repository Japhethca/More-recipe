import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

const expect = chai.expect;
const url = app;

describe('Users Signup endpoint: ', () => {
  let userData = {
    firstname : 'benjamin',
    lastname: 'anyigor',
    username: 'ben10',
    email: 'benjaminanyigor@gmail.com',
    password: 'benjamin',
    verifyPassword: 'benjamin',
  };
  it('should allow creation of new users', (done) => {
    chai.request(url)
      .post('/api/users/signup')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Account Successfully created!';
        done();
      });
  });

  it('should not allow creation of users with any fields', (done) => {
    chai.request(url)
      .post('/api/users/signup')
      .send({
        firstname : '',
        lastname: '',
        username: 'ben10',
        email: 'benjaminanyigor@gmail.com',
        password: 'benjamin',
        verifyPassword: 'benjamin',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        done();
      });
  });

  it('should not allow creation of users if password does not match', (done) => {
    chai.request(url)
      .post('/api/users/signup')
      .send({
        firstname : 'benjamin',
        lastname: 'anyigor',
        username: 'ben10',
        email: 'benjaminanyigor@gmail.com',
        password: 'benjamin',
        verifyPassword: 'benj',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res).to.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'password did not match';
        done();
      });
  });

  it('should not allow users to create account using same details', (done) => {
    chai.request(url)
      .post('/api/users/signup')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res).to.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('User already exists');
        done();
      });
  });
});


describe("Users Signin endpoint", () => {
  let signinData = {
    email: 'benjaminanyigor@gmail.com',
    password: 'benjamin',
  };

  it('should signin if users does not exist', (done) => {
    chai.request(url)
      .post('/api/users/signin')
      .send({email:'invalidmail@gmail.com', password:'password'})
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'User does not exist';
        done();
      });
  });


  it('should should not allow signin with empty fields', (done) => {
    chai.request(url)
      .post('/api/users/signin')
      .send(signinData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        done();
      });
  });
  
  it('should signin users with their details', (done) => {
    chai.request(url)
      .post('/api/users/signin')
      .send(signinData)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'User does not exist';
        done();
      });
  });
});
