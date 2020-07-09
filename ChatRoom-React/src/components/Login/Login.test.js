import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login.js';
 
configure({adapter: new Adapter()});
 
describe('<Login /> with no props', () => {
  const voidFunc = () => void 0;
  let wrapper;
  beforeEach(() => { wrapper = shallow(<Login onLogIn={voidFunc}/>); });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an input and a button', () => {
    expect(wrapper.find('.input')).toHaveLength(1);
    expect(wrapper.find('.button')).toHaveLength(1);
  });
});
