import expect from 'expect';
import superagent from 'superagent';
import fileUpload from '../../utilities/fileUpload';

jest.mock('superagent');
superagent.post = () => ({
  attach: jest.fn(),
  field: jest.fn(),
  end: fn => fn({ message: 'error uploading image' }, {
    body: {
      url: 'http://res.cloudinary.com/dd3lv0o93/image/' +
      'upload/v1516006383/hghev3xifrmlmeqbocmp.png'
    }
  })
});


describe('FILE UPLOAD', () => {
  it('should successfully upload an image', () => {
    const image = {
      name: '/Users/andeladeveloper/Desktop/More-Recipes/' +
      'template/images/sharwama.jpg',
      size: 61387,
      type: 'image/jpeg'
    };
    fileUpload(image).end((error, response) => {
      expect(error.message).toBe('error uploading image');
      expect(response.body.url)
        .toBe('http://res.cloudinary.com/dd3lv0o93/image/' +
      'upload/v1516006383/hghev3xifrmlmeqbocmp.png');
    });
  });
});
