import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';


chai.use(chaiHttp);

const { expect } = chai;

let token;


describe('SIGNUP', () => {
  it('should not signup with missing fields', (done) => {
    chai.request(app)
      .post('/api/users/signup')
      .send({
        firstname: '',
        lastname: '',
        username: 'will',
        password: 'smith',
        verifyPassword: 'smith',
        email: 'willsmith@gmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        done();
      });
  });

  it('should not signup with missing fields', (done) => {
    chai.request(app)
      .post('/api/users/signup')
      .send({
        firstname: 'will',
        lastname: 'smith',
        username: 'will',
        password: 'smith',
        verifyPassword: 'smitl',
        email: 'willsmith@gmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body.message).to.be.eqls = 'password did not match';
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
        expect(res).to.be.json;
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
        expect(res).to.be.json;
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
        expect(res).to.be.json;
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
        expect(res).to.be.json;
        expect(res.body.message).to.be.eqls = 'User does not exist';
        done();
      });
  });
});

describe('USER', () => {
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
  it('should get details of registered users', (done) => {
    chai.request(app)
      .get('/api/admin/user/3')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property = 'user';
        done();
      });
  });

  it('should fail when getting details on non users', (done) => {
    chai.request(app)
      .get('/api/admin/user/33')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body.message).to.be.eqls = 'user does not exist';
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
        token = res.body.Token;
        done();
      });
  });
  it('should get user profile', (done) => {
    chai.request(app)
      .get('/api/users/profile')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property = 'user';
        done();
      });
  });

  it('should update user profile', (done) => {
    chai.request(app)
      .post('/api/users/profile')
      .query({ token })
      .send({
        firstname: 'benjamin',
        lastname: 'Anyigor',
        email: 'ben10@gmail.com',
        password: 'ben10',
        username: 'ben10',
        aboutme: 'am cool',
        photo: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property = 'message';
        done();
      });
  });

  it('should not update if new password an old password are the same', (done) => {
    chai.request(app)
      .post('/api/users/profile')
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
        expect(res).to.be.json;
        expect(res.body).to.have.property = 'message';
        done();
      });
  });
});

