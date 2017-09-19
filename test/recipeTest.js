import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;

const url = 'http://127.0.0.1:3000';


describe('API ROOT', () => {
  it('should display a welcome text on home page', (done) => {
    chai.request(url)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Welcome to the more recipe app';
        done();
      });
  });

  it('should give an error if non implemented route is accessed', (done) => {
    chai.request(url)
      .get('/invalid/pages')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('END POINT /API/RECIPES', () => {
  let token;
  before((done) => {
    const signDetails = { email: 'chidexj@gmail.com', password: 'chidex4me' };
    chai.request(url)
      .post('/api/users/signin')
      .send(signDetails)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });


  beforeEach((done) => {
    chai.request(url)
      .get('/')
      .send({'token': token})
      .end((err, res) => {
        done();
      });
  })


  it('should create new recipes', (done) => {
    let newRecipe = {
      name: 'Egusi soup recipes',
      ingredient: 'grinded Melon, palm oil, meat, maggi, salt, crayfish',
      description: 'Here the recipes for preparing egusi soup',
      direction: 'first boil the meat and fishes, then put egusi and other ingredients that is needed',
    };
    chai.request(url)
      .post('/api/recipes/')
      .send(newRecipe)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe successfully created';   
        done();   
      });
  });
  

  it('should not create recipe that the name already exist', (done) => {
    let newRecipes = {
      name: 'Egusi soup recipes',
      ingredient: 'grinded Melon, palm oil, meat, maggi, salt, crayfish',
      description: 'Here the recipes for preparing egusi soup',
      direction: 'first boil the meat and fishes, then put egusi and other ingredients that is needed',
    };
    chai.request(url)
      .post('/api/recipes/')
      .send(newRecipes)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res).to.have.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe with this name already exists';      
        done();
      });
  });
  

  it('should fail if some of the fields are empty while creating recipes', (done) => {
    let newRecipes = {
      name: '',
      ingredient: '',
      description: 'Here the recipes for preparing egusi soup',
      direction: 'first boil the meat and fishes, then put egusi and other ingredients that is needed',
    };
    chai.request(url)
      .post('/api/recipes/')
      .send(newRecipes)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        done()
      });
  });


  it('should fail if some of the fields has spaces while creating recipes', (done) => {
    let newRecipes = {
      name: '  ',
      ingredient: '   ',
      description: 'Here the recipes for preparing egusi soup',
      direction: 'first boil the meat and fishes, then put egusi and other ingredients that is needed',
    };
    chai.request(url)
      .post('/api/recipes/')
      .send(newRecipes)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        done();
      });
  });
  

  it('should get all recipes with GET "/api/recipes', (done) => {
    chai.request(url)
      .get('/api/recipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have.property('body');
        expect(res.body).to.have.property.property('list');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'All recipes:';
        expect(res.body.list).to.be.instanceof = 'array';
        done();
      });
  });


  it('should be able to get recipe by id', (done) => {
    chai.request(url)
      .get('/api/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });


  it('should not get invalid recipe id', (done) => {
    chai.request(url)
      .get('/api/recipes/70000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res).to.have.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'No Recipes found';  
        done();  
      });
  });


  it('should sort recipes in descending order', (done) => {
    chai.request(url)
      .get('/api/recipes/')
      .query({sort:'upvotes', order:'descending'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'All Recipes displayed in Descending order';    
        done();
      });
  });


  it('should be able to update recipes', (done) => {
    let newRecipes = {
      name: 'Egusi soup with tomato recipes',
      ingredient: 'grinded Melon, palm oil, meat, maggi, salt, crayfish, tomato',
      description: 'Here the recipes for preparing egusi soup',
      direction: 'first boil the meat and fishes, then put egusi and other ingredients that is needed',
    };
    chai.request(url)
      .put('/api/recipes/')
      .send(newRecipes)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe update Successful';   
        done();   
      });
  });


  it('should be able to delete recipe', (done) => {
    chai.request(url)
      .delete('/api/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe deleted successfully';   
        done();
      });
  });


  it('should not delete recipe that does not exist', (done) => {
    chai.request(url)
      .delete('/api/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res).to.have.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Cannot delete recipe, does not exist';  
        done();   
      });
  });


  it('should not delete recipe with id less that 1', (done) => {
    chai.request(url)
      .delete('/api/recipes/0')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        expect(res).to.have.have.property('body');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.eql = 'Recipe Id cannot be less than 1';  
        done(); 
      });
  });
 
});
