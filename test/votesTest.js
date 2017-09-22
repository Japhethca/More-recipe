import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;
const url = 'http://127.0.0.1:3000';


describe('Voting Recipe Endpoint: ', () => {
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
      .set({ token})
      .end((err, res) => {
        done();
      });
  });

  it('should upvote a recipe', () => {
    chai.request(url)
      .put('/recipes/1/upvotes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Recipe upvoted Successfully';
        done();
      });
  });


  it('should not allow users to vote for recipes that does not exist', () => {
    chai.request(url)
      .put('/recipes/1000/upvotes')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Recipe does not exist!';
        done();
      });
  });


  it('should not allow users to upvote a recipes that has been upvoted', () => {
    chai.request(url)
      .put('/recipes/1/upvotes')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Already upvoted recipe';
        done();
      });
  });


  it('should allow users to downvote a recipe', () => {
    chai.request(url)
      .put('/recipes/1/downvotes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Recipe downvoted Successfully';
        done();
      });
  });


  it('should not downvote recipe that does not exist', () => {
    chai.request(url)
      .put('/recipes/100/downvotes')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal = 'Recipe does not exist!';
        done();
      });
  });

});
