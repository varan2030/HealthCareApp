import React, { Component } from 'react';

class Menu extends Component {
  render() {
    return (
      <div className={ this.props.className}>
        { this.props.children }
      </div>
    )    
  }
}

export default Menu