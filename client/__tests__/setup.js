import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';


global.shallow = shallow;
global.toJson = toJson;

configure({ adapter: new Adapter() });
