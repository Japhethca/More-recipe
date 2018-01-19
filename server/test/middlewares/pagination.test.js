import { expect } from 'chai';
import pagination from '../../middlewares/pagination';

describe('PAGINATION', () => {
  it('should return an offset when given a limit and page number', () => {
    const { limit, offset } = pagination(3, 3);
    expect(offset).to.equal(6);
    expect(limit).to.be.equal(3);
  });
});

