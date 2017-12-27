import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);

const { expect } = chai;

let token;


describe('SIGNUP', () => {
  it('should not signup with missing fields', (done) => {
    chai.request(app)
      .post('/api/users/signup')
      .send({
        username: '',
        password: 'smith',
        verifyPassword: 'smith',
        email: 'willsmith@gmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.eql = 'failed';
        expect(res.body).to.have.property = 'message';
        done();
      });
  });

  it('should not signup if password and verifyPassword differ', (done) => {
    chai.request(app)
      .post('/api/users/signup')
      .send({
        username: 'will',
        password: 'smith',
        verifyPassword: 'smitl',
        email: 'willsmith@gmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.eql = 'failed';
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eqls = 'password did not match';
        done();
      });
  });

  it('should signup user successfully', (done) => {
    chai.request(app)
      .post('/api/users/signup')
      .send({
        username: 'andela2018',
        password: '123456',
        verifyPassword: '123456',
        email: 'andela@gmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.eql = 'success';
        expect(res.body).to.have.property = 'message';
        expect(res.body).to.have.property = 'userData';
        expect(res.body.message).to.be.eqls = 'Account Successfully created!';
        done();
      });
  });
});

describe('SIGIN', () => {
  it('should allow users to signin', (done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ngozinwali@gmail.com',
        password: 'ngobest'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.eqls = 'Login Successful!';
        expect(res.body).to.have.property = 'Token';
        done();
      });
  });

  it('should not allow signin with missing fields', (done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        password: 'ngobe'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property = 'message';
        done();
      });
  });

  it('should not allow users to signin with incorrect credentials', (done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ngozinwali@gmail.com',
        password: 'ngobe'
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eqls = 'Password Incorrect';
        done();
      });
  });

  it('should not signin non users', (done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ngozi@gmail.com',
        password: 'ngobvv'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eqls = 'User does not exist';
        done();
      });
  });
});

describe('USER PROFILE', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ben10@gmail.com',
        password: 'ben10'
      })
      .end((err, res) => {
        ({ token } = res.body);
        done();
      });
  });

  it('should get user profile', (done) => {
    chai.request(app)
      .get('/api/users/profile')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property = 'user';
        done();
      });
  });

  it('should update user profile', (done) => {
    chai.request(app)
      .put('/api/users/profile')
      .query({ token })
      .send({
        firstname: 'benjamin',
        lastname: 'Anyigor',
        email: 'ben10@gmail.com',
        password: 'ben10',
        aboutme: 'am cool',
        photo: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property = 'message';
        expect(res.body.body).to.be.eql = 'Profile Update Successful';
        done();
      });
  });

  it('should not update if new password an old password are the same', (done) => {
    chai.request(app)
      .put('/api/users/profile')
      .query({ token })
      .send({
        firstname: 'benjamin',
        lastname: 'Anyigor',
        email: 'ben10@gmail.com',
        password: 'ben10',
        newPassword: 'ben10',
        username: 'ben10',
        aboutme: 'am cool',
        photo: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property = 'message';
        expect(res.body.message).to.be.eql = 'password Must Differ';
        done();
      });
  });
});

