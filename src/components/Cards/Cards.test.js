import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Cards from "./";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe("Cards component", () =>{
  
  test('renders', () => {
    const wrapper = shallow(<Cards />);
    expect(wrapper.exists()).toBe(true);
  })

  test('when the Cards is clicked the Modal is opened', () =>{
    const wrapper = (<Cards />);
    expect(wrapper).toMatchSnapshot();
  })
});
