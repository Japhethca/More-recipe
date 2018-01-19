import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

global.process.env.CLOUDINARY_NAME = 'cloudinary';
global.process.env.CLOUDINARY_PRESETS = 'imageme';
global.process.env.CLOUDINARY_API_KEYS = '24974587395';

global.shallow = shallow;
global.toJson = toJson;

global.localStorage = {
  clear: jest.fn(),
  set: jest.fn(data => data),
  get: jest.fn(),
  removeItem: jest.fn(item => item)
};

global.document.getElementById = () => ({ innerHTML: '' });

global.$ = () => ({
  sideNav: jest.fn(),
  collapsible: jest.fn(),
  dropdown: jest.fn(),
  modal: jest.fn()
});

global.qs = {
  parse: jest.fn()
};


global.uploadRequest = data => new Promise((resolve, reject) => {
  resolve(data.url);
  reject();
});

global.sha1 = jest.fn();
global.superagent = jest.fn();


configure({ adapter: new Adapter() });
