import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import API from "./utils/API";
import Cards from './components/Cards';
import Button from './components/Button';
import Content from './components/Content';
import Menu from './components/Menu';
import swal from '@sweetalert/with-react';
import './App.css';

class App extends Component {

  constructor (props) {

    super(props);
//States
      this.state = {
      data:[],                                                    //data from https://www.healthcare.gov/api
      url: "",                                                    // current page URL
      condition: false,                                           // style menu, content, menu-btn
    };

    this.handleMenu = this.handleMenu.bind(this);                 
  }

  // Load page when user click back and forward browser button
componentDidMount(){
  window.onpopstate = this.handlePopState.bind(this);
  window.onload = this.handlePopState.bind(this);
}

//Get variable from current URL to run API function
handlePopState () {
  let url1 = window.location.pathname.split("/"); 
  let url = url1[1];                                               //current type of content (articles, blog ...)
  this.setState({url: url});
  if(url) {
    this.getData(url)
  } else {
    this.setState({data: []})
  };
}

//API GET https://www.healthcare.gov/api/${content}.json
  getData (url) {
    API.getContent(url)
   .then(res => this.handleData(res.data))
   .catch(err => console.log(err))
   console.log(url)
  }

//Handle recieved data from https://www.healthcare.gov/api and store in this.state.data
  handleData = data => {
    this.setState({data: []});
    
    if (data.articles) this.setState({data: data.articles});
    if (data.blog) {this.setState({data: data.blog})};
    if (data.glossary) this.setState({data: data.glossary});
    if (data.states) this.setState({data: data.states});
    if (data.topics) this.setState({data: data.topics});
     console.log(this.state.data);
    }
 
// Handle Home Page. Display no data
  handleHomePage(){
    this.setState({data: []})
    this.setState({url: ""});
  }

// Menu pops up
  handleMenu(){
    this.setState({
      condition: !this.state.condition
    })
  }

//Display Title, Content and URL when user clicks the card
clickCard (title, content, url){
    swal(<div>
   <h1 className="text-center"><a href={'https://www.healthcare.gov' + url}>{title}</a></h1>
   <div dangerouslySetInnerHTML={{__html: content}}></div>
   </div>
    )
  }
 
  render() {
    return (
      <div className="App">
      <Container>
       <div className="wrapper">
      <Router>
     <div>
        <Menu className={ this.state.condition ? "menu menu_active" : "menu" }> {/*change Menu className*/}
          <div className="btn-wrapper">
            <Button  className={ this.state.condition ? "menu-btn menu-btn_active" : "menu-btn" } 
        toggleClassName={ this.handleMenu }>                                    {/*change Button className*/}
              <span></span>
            </Button>
          </div>
          {/*List of App's pages*/}
          <nav className="menu-list">
          <div className="main-button"><Link onClick={() => this.handleHomePage()} to="/">Home</Link></div>
          <div className="main-button" onClick={() => this.handlePopState()}><Link to="/articles">Articles</Link></div>
          <div className="main-button" onClick={() => this.handlePopState()}><Link to="/blog">Blog</Link></div>
          <div className="main-button" onClick={() => this.handlePopState()}><Link to="/glossary">Glossary</Link></div>
          <div className="main-button" onClick={() => this.handlePopState()}><Link to="/states">States</Link></div>
          <div className="main-button" onClick={() => this.handlePopState()}><Link to="/topics">Topics</Link></div>
          </nav>
        </Menu>
        <Route path="/:id"/>
        </div>
    </Router>
    <Content className={ this.state.condition ? "content content_active" : "content" }> {/*change Content className*/}
    <div className="header text-center">{this.state.url.toUpperCase()}</div>
   {/*Display data on cards*/}
    {this.state.data
      .map(index =>(
        <Cards
        title = {index.title}
        content={index.content}
        lang={index.lang}
        url = {index.url}
        clickCard = {this.clickCard}
        />
      ))} 
      </Content>
      </div>
      </Container>
      </div>
    );
  }
}

export default App;