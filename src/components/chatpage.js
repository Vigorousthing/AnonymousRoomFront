import React, { Component } from 'react';
import ChatBox from '../components/chatbox'


class ChatPage extends Component {
  outer_style = {
    justify_content: 'center',
    width: "100%",
  }
  inner_style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  render() {
    return (
      <div style={this.outer_style}>
          <ChatBox></ChatBox>
      </div>
    );
  }
}

export default ChatPage;

        