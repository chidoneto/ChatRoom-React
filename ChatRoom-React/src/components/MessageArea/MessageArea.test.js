import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageArea from './MessageArea.js';
 
configure({adapter: new Adapter()});
 
describe('<MessageArea /> with no props', () => {
  const voidFunc = () => void 0;
  let wrapper;
  beforeEach(() => { wrapper = shallow(<MessageArea onMessageTyped={voidFunc}/>); });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an input and a button', () => {
    expect(wrapper.find('.MessageArea')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(1);
  });
});
