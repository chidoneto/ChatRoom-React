import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login.js';
 
configure({adapter: new Adapter()});
 
describe('<Login /> form', () => {
  let userNameValue;
  const mockCallback = jest.fn((userName) => { userNameValue = userName; });
  let wrapper;
  
  beforeEach(() => { wrapper = shallow(<Login onLogIn={mockCallback}/>); });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an input and a button', () => {
    expect(wrapper.find('.Login')).toHaveLength(1);
    expect(wrapper.find('.input')).toHaveLength(1);
    expect(wrapper.find('.button')).toHaveLength(1);
  });

  it('should trigger callback on button click', () => {
    wrapper.find('.button').simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should set user name, and receive such value back on click', () => {
    const USER_NAME = 'Joe Doe';

    wrapper.find('.input').simulate('change', { target: { value: USER_NAME } });
    expect(wrapper.find('.input').prop('value')).toEqual(USER_NAME);
    wrapper.find('.button').simulate('click');
    expect(userNameValue).toEqual(USER_NAME);
  });
});
