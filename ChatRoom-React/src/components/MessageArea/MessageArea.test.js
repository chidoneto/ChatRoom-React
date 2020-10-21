import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageArea from './MessageArea.js';
 
configure({adapter: new Adapter()});
 
describe('<MessageArea /> with no props', () => {
    let messageValue;
    const mockCallback = jest.fn((message) => { messageValue = message; });
    let wrapper;
    
    beforeEach(() => { wrapper = shallow(<MessageArea onMessageTyped={mockCallback}/>); });

    it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should have an input and a button', () => {
        expect(wrapper.find('.MessageArea')).toHaveLength(1);
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('should trigger callback on button click', () => {
        wrapper.find('input').simulate('change');
        expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it('should set a message, and receive such value back on submit', () => {
        const MESSAGE = 'This is just a sample message text. No more, no less...';

        wrapper.find('input').simulate('change', { target: { value:  MESSAGE} });
        expect(wrapper.find('input').prop('value')).toEqual(MESSAGE);
        wrapper.find('.MessageArea').simulate('submit');
        expect(messageValue).toEqual(MESSAGE);
    });

    it('input and submit button should be disabled when called that way', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('input').prop('disabled')).toBeTruthy();
        expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    });

    it('input and submit button should be enabled when called that way', () => {
        wrapper.setProps({ disabled: false });
        expect(wrapper.find('input').prop('disabled')).toBeFalsy();
        expect(wrapper.find('button').prop('disabled')).toBeFalsy();
    });
});
  
