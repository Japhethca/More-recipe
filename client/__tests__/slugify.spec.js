import slugify from '../utilities/slugify';

describe('Slugify', () => {
  it('should convert "this is a slug" text to a slug', () => {
    const text = 'this is a slug';
    expect(slugify(text, '-')).toBe('this-is-a-slug');
  });
});

