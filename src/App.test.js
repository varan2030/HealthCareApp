import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import App from "./App";
import Adapter from 'enzyme-adapter-react-16';
import Content from './components/Content';

Enzyme.configure({adapter: new Adapter()});

describe("App component", () =>{
  test('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  })

  test('recieve data', () => {
    const wrapper = mount(<App />);
      wrapper.find('.main-button').at('click',{
      onClick: () => {  }
    })
    expect(wrapper).toMatchObject({});
  })

  test('array of articles',() =>{
    const wrapper = shallow(<App data ={[]}/>);
    expect(wrapper.find(".cards")).toHaveLength(0);
  })

  test("renders content when data recieved", () => {
    const wrapper = mount(<App data={[]}/>);
    wrapper.setProps({
      data:[{url: "https://www.healthcare.gov"}]
    });
    expect(wrapper.find("a").at("https://www.healthcare.gov"));
  });
})
