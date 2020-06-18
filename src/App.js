import React, { Component } from 'react';
// import MainPage from './components/mainpage'
import ChatPage from './components/chatpage'
import './App.css';
import store from './store'
// import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import ChatBox from './components/chatbox';


class App extends Component {
  state = {mode: "main"}

  outer_style = {
    justify_content: 'center',
    width: "100%",
  }

  constructor(props) {
    super(props)
    store.subscribe(function() {
        this.setState({mode: store.getState().mode})
    }.bind(this))
  }

  render() {
    // if (this.state.mode === "main") {
    //   var page = <MainPage></MainPage>
    // } else if (this.state.mode === "chat") {
    //   var page = <ChatPage></ChatPage>
    // }
    return (
      <div>
        {/* <MainPage></MainPage> */}
        {/* {page} */}

        <ChatPage></ChatPage>
      </div>
    );
  }
}

export default App;
        