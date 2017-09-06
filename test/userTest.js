import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;
describe('API /API/USERS/SIGNIN', () => {
  it('Should login Users', (done) => {
    chai.request('http://127.0.0.1:8000')
      .post('/api/users/signin')
      .send({ email: 'chidexj@gmail.com', password: 'chidex4me' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).have.property('message');
        expect(res.body.message).to.eql = 'Login Successful!';
        done();
      });
  });
  it('should not login non users', (done) => {
    chai.request('http://127.0.0.1:8000')
      .post('/api/users/signin')
      .send({ email: 'chidexj@gil.c', password: 'chidexe' })
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
    chai.request('http://127.0.0.1:8000')
      .post('/api/users/signup')
      .send({ email: 'mymail@.com', password: 'mymail', firstname:'youname',lastname:'myname',aboutme:'just me', username:'myname' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).have.property('message');
        expect(res.body.message).to.eql = 'Account Successfully created!';
        done();
      });
  });
  it('Should prevent old users from creating new acount with the same details', (done) => {
    chai.request('http://127.0.0.1:8000')
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
  it('', (done) => {
    chai.request('http://127.0.0.1:8000')
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

