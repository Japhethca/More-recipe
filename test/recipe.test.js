import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';


chai.use(chaiHttp);

const { expect } = chai;

const url = app;
let token;


describe('Recipes', () => {
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
  it('should get all recipes in app', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should get single recipe by id', (done) => {
    chai.request(app)
      .get('/api/recipes/1')
      .send({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('should give error when accessing recipe that doesnt exist', (done) => {
    chai.request(app)
      .get('/api/recipes/1233')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
  // it('should allow users to create new recipe', (done) => {
  //   chai.request(app)
  //     .post('/api/recipes')
  //     .query({ token })
  //     .send({
  //       name: 'whateverjknnjn',
  //       description: 'this is an afr soup',
  //       ingredient: 'maggjnlkn',
  //       direction: 'first do then the other',
  //     })
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res.body).to.have.property('message');
  //       done();
  //     });
  // });
  it('should allow users to update existing recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/1')
      .query({ token })
      .send({
        name: 'new recipe name',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('should not allow users to update non existing recipe', (done) => {
    chai.request(app)
      .put('/api/recipes/300')
      .query({ token })
      .send({
        name: 'new recipe name',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        done();
      });
  });
  it('should not allow users to update recipe that they didnt create', (done) => {
    chai.request(app)
      .put('/api/recipes/2')
      .query({ token })
      .send({
        name: 'new recipe name',
        description: 'this is an afr soup',
        ingredient: 'magg',
        direction: 'first do then the other'
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        done();
      });
  });

  it('should be able to delete recipe user created', (done) => {
    chai.request(app)
      .delete('/api/recipes/1')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('should give error when deleting recipe that doesnt exist', (done) => {
    chai.request(app)
      .delete('/api/recipes/1')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should not allow user to delete recipe he didnt create', (done) => {
    chai.request(app)
      .delete('/api/recipes/2')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should return a message if a user has no recipes', (done) => {
    chai.request(app)
      .get('/api/users/recipes')
      .query({ token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        done();
      });
  });
});

