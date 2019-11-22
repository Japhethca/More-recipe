import { expect } from 'chai';
import { Recipes } from '../../models';

describe('Recipes Model', () => {
  it('should create a Recipes instance', (done) => {
    Recipes.create({
      name: 'yam porage',
      description: 'my favorite yam porage',
      direction: 'boil the yam',
      ingredients: 'yam',
      userId: 3
    }).then((recipes) => {
      expect(recipes.name).to.equal('Yam porage');
      expect(recipes.description).to.equal('My favorite yam porage');
      expect(recipes.direction).to.equal('boil the yam');
      expect(recipes.ingredients).to.equal('yam');
    }).catch(done());
  });
});
