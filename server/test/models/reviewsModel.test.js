import { expect } from 'chai';
import { Reviews } from '../../models';

describe('Reviews Model', () => {
  it('should create a Reviews instance', (done) => {
    Reviews.create({
      content: 'nice recipe',
      userId: 3,
      recipeId: 2
    }).then((reviews) => {
      expect(reviews.content).to.equal('Nice recipe');
      expect(reviews.recipeId).to.equal(2);
      expect(reviews.userId).to.equal(3);
    }).catch(done());
  });
});
