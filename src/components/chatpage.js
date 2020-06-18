import React, { Component } from 'react';
import ChatBox from '../components/chatbox'
// import ChatSelection from '../components/chat_selection'


class ChatPage extends Component {
  outer_style = {
    display: 'flex',
    justifyContent: 'auto',
    // width: "100%",
  }
  render() {
    return (
      <div style={this.outer_style}>
          <ChatBox></ChatBox>
          {/* <ChatSelection></ChatSelection> */}
      </div>
    );
  }
}

export default ChatPage;

        