import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Menu from "./";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe("Menu component", () =>{
  
  test('renders', () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper.exists()).toBe(true);
  })

  test('when the Menu is clicked the Modal is opened', () =>{
    const wrapper = (<Menu />);
    expect(wrapper).toMatchSnapshot();
  })
});
