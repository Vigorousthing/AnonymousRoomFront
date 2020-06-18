import React, { Component } from 'react';


class ChatSelection extends Component {
    outer_style = {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        // alignItems: 'center'
        // justify_content: 'center',
        // width: "100%",
    }
    button_style = {
        width: "100%",
        height: "30%",
    }
    render() {
      return (
        <div style={this.outer_style}>
            <button style={this.button_style}>1</button>
            <button style={this.button_style}>2</button>
            <button style={this.button_style}>3</button>
        </div>
      );
    }
  }
  
  export default ChatSelection;
  