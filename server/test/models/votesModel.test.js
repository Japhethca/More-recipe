import { expect } from 'chai';
import { Votes } from '../../models';

describe('Votes Model', () => {
  it('should create a Votes instance', (done) => {
    Votes.create({
      vote: 0,
      userId: 3,
      recipeId: 2
    }).then((votes) => {
      expect(votes.vote).to.equal(0);
      expect(votes.userId).to.equal(3);
      expect(votes.recipeId).to.equal(2);
    }).catch(done());
  });
});
