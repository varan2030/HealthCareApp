import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Container, DropdownItem, Row} from 'reactstrap';
import API from "./utils/API"


class App extends Component {

  constructor (props) {
    super(props);
  
    this.toggle = this.toggle.bind(this);
    
    this.state = {
      dropdownOpen: false,
      publications: [{name: "Articles"}, {name:"Blog"}, {name:"Glossary"}, {name:"States"}, {name:"Topics"}],
      publication: "",
      content: []
    };
  }
  
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  uploadContent = con => {
  
   this.setState({publication: con.toLowerCase()});

   API.getContent(con.toLowerCase())
   .then(res => this.displayContent(res))
   .catch(err => console.log(err))
  }

  displayContent = data => {
    this.setState({content: []});
    if (data.data.articles) this.setState({content: data.data.articles});
    if (data.data.blog) this.setState({content: data.data.blog});
    if (data.data.glossary) this.setState({content: data.data.glossary});
    if (data.data.states) this.setState({content: data.data.states});
    if (data.data.topics) this.setState({content: data.data.topics});
    this.state.content.forEach(function(element){
      element.excerpt = element.content.substring(0,20);
    })
    // console.log(this.state.content)
  }

  // hello = function(){
    
  //  console.log(this.state.content)
  // }

  render() {
    return (
      <div className="App">
       <Container>
       <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu>
         {this.state.publications
         .map(key =>(
            <DropdownItem onClick={() => this.uploadContent(key.name)}>{key.name}
           </DropdownItem>
         ))
        }
       </DropdownMenu>
      </Dropdown> 
      {this.state.content
      .map(index =>(
       
        <Row>
        <div lassName="content"  dangerouslySetInnerHTML={{__html: index.excerpt}}></div>
        <br></br><br></br>
        </Row>
      ))}  
      </Container>
      </div>
    );
  }
}

export default App;
