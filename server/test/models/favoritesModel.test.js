import { expect } from 'chai';
import { Favorites } from '../../models';

describe('Favorites Model', () => {
  it('should create a Favorites instance', (done) => {
    Favorites.create({
      recipeId: 2,
      userId: 3
    }).then((favorites) => {
      expect(favorites.recipeId).to.equal(2);
      expect(favorites.userId).to.equal(3);
    }).catch(done());
  });
});

