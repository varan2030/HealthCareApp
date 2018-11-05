import React, { Component } from 'react';
import {Container, Row} from 'reactstrap';
import API from "./utils/API"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css'

class App extends Component {

  constructor (props) {
    super(props);
      this.state = {
      content:[],
      url: "",
      condition: false
    };

    this.handleMenu = this.handleMenu.bind(this);
  }

componentDidMount(){
  window.onpopstate = this.handlePopState.bind(this);
  window.onload = this.handlePopState.bind(this);
}

handlePopState () {
  let url1 = window.location.pathname.split("/");
  let url = url1[1];
  if(url) {
    this.uploadContent(url)
  } else {
    this.setState({content: []})
  };
}

  uploadContent (url) {
    API.getContent(url)
   .then(res => this.displayContent(res))
   .catch(err => console.log(err))
   console.log(url)
  }

  displayContent = data => {
    this.setState({content: []});
    if (data.data.articles) this.setState({content: data.data.articles});
    if (data.data.blog) this.setState({content: data.data.blog});
    if (data.data.glossary) this.setState({content: data.data.glossary});
    if (data.data.states) this.setState({content: data.data.states});
    if (data.data.topics) this.setState({content: data.data.topics});
    console.log(this.state.content)
  }

  handleHomePage(){
    this.setState({content: []});
  }

  handleMenu(){
    this.setState({
      condition: !this.state.condition
    })
  }
 
  render() {
    return (
      <div className="App">
      <Container>
       <div className="wrapper">
      <Router>
     <div>
        <Menu className={ this.state.condition ? "menu menu_active" : "menu" }>
          <div className="btn-wrapper">
            <Button  className={ this.state.condition ? "menu-btn menu-btn_active" : "menu-btn" }
        toggleClassName={ this.handleMenu }>
              <span></span>
            </Button>
          </div>
          <nav className="menu-list">
          <div><Link onClick={() => this.handleHomePage()} to="/">Home</Link></div>
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
    <Content className={ this.state.condition ? "content content_active" : "content" }>
    {this.state.content
      .map(index =>(
        <Row>
        <h1 ><a href={'https://www.healthcare.gov'+ index.url}>{index.title}</a></h1>
        <div className="content"  dangerouslySetInnerHTML={{__html: index.content}}></div>
        <br></br><br></br>
        </Row>
      ))} 
      </Content>
      </div>
      </Container>
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <div
        className={ this.props.className }
        onClick={ this.props.toggleClassName }
      >
        { this.props.children }
      </div>
    )    
  }
}

class Menu extends React.Component {
  render() {
    return (
      <div className={ this.props.className}>
        { this.props.children }
      </div>
    )    
  }
}

class Content extends React.Component {
  render() {
    return (
      <div className={ this.props.className }>
        { this.props.children }
      </div>
    )    
  }
}

export default App;
