import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Content from "./";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe("Content component", () =>{
  
  test('renders', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper.exists()).toBe(true);
  })

  test('when the Content is clicked the Modal is opened', () =>{
    const wrapper = (<Content />);
    expect(wrapper).toMatchSnapshot();
  })
});
