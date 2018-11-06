import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Button from "./";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe("Button component", () =>{
  
  test('renders', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.exists()).toBe(true);
  })

  test('when the button is clicked the menu is opened', () =>{
    const wrapper = (<Button />);
    expect(wrapper).toMatchSnapshot();
  })
});

