import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';

let expect = chai.expect


chai.use(chaiHttp);

let url = 'http://localhost:3000';
describe("Recipes", () => {
  it('should list all recipes on /api/recipes GET', (done) => {
    chai.request(url)
      .get('/api/recipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('ingredients');
        done();
      });
  });

  it('should get a single recipe on  /api/recipes/<recipeId> GET',(done) => {
    chai.request(url)
      .get('/api/recipes/1')
      .end((err,res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body).to.have.property('name');
        res.
        done();
      });
  });
  it('should delete single recipe on /api/recipes/<recipeId> DELETE', (done) => {
    chai.request(url)
      .get
  });
  it('should modify single recipe on /api/recipes/<recipeId> PUT');
  it('should add recipe on /api/recipes POST');
  it('should order recipes by upvotes on  /api/recipes?sort=upvotes&votes=ascending GET');
  it('should list recipe reviews on /api/recipes/<recipeId>review GET');
  it('should add recipe review on /api/recipes/<recipeId>/review POST', (done) => {
    chai.request(url)
      .post('/api/recipes/1/review')
      .send({content:'this recipe rock! Thanks for sharing',title:'awesome recipe'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
})