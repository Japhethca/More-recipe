import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';


chai.use(chaiHttp);

const { expect } = chai;

let token;


describe('SIGNUP CONTROLLER', () => {
  it('should return 400 status required fields are empty', (done) => {
    chai.request(app)
      .post('/api/users/signup')
      .send({
        username: '',
        password: 'smith',
        verifyPassword: 'smith',
        email: 'willsmith@gmail.com',
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.status).to.be.eql('failed');
        expect(response.body).to.have.property('message');
        done();
      });
  });

  it('should not signup user when passwords differ', (done) => {
    chai.request(app)
      .post('/api/users/signup')
      .send({
        username: 'will',
        password: 'smith',
        verifyPassword: 'smitl',
        email: 'willsmith@gmail.com',
      })
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body.status).to.be.eql('failed');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.eqls('Password did not match');
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
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.status).to.be.eql('success');
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('userData');
        expect(response.body.message).to.be.eqls('Account Successfully created!');
        done();
      });
  });
});

describe('SIGIN CONTROLLER', () => {
  it('should successfully signin users', (done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ngozinwali@gmail.com',
        password: 'ngobest'
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.status).to.eq('success');
        expect(response.body.message).to.be.eqls('Login Successful!');
        expect(response.body).to.have.property('token');
        done();
      });
  });

  it(
    'should return 400 status when there is an empty required fields',
    (done) => {
      chai.request(app)
        .post('/api/users/signin')
        .send({
          password: 'ngobe'
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.have.property('message');
          done();
        });
    }
  );

  it(
    'should return 403 status when a user enters an incorrect credentials',
    (done) => {
      chai.request(app)
        .post('/api/users/signin')
        .send({
          email: 'ngozinwali@gmail.com',
          password: 'ngobe'
        })
        .end((error, response) => {
          expect(response).to.have.status(403);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.be.eqls('Password Incorrect');
          done();
        });
    }
  );

  it('should return 404 status if user does not exist', (done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ngozi@gmail.com',
        password: 'ngobvv'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.status).to.eq('failed');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.eql('User does not exist');
        done();
      });
  });
});

describe('USER PROFILE CONTROLLER', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/signin')
      .send({
        email: 'ben10@gmail.com',
        password: 'ben10'
      })
      .end((error, response) => {
        ({ token } = response.body);
        done();
      });
  });

  it('should successfully return user profile', (done) => {
    chai.request(app)
      .get('/api/users/profile')
      .query({ token })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('email');
        done();
      });
  });

  it('should successfully update user profile', (done) => {
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
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.status).to.eq('success');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.eql('Profile Update Successful');
        done();
      });
  });
});

