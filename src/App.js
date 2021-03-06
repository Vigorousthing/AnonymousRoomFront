import React, { Component } from 'react';
// import MainPage from './components/mainpage'
import ChatPage from './components/chatpage'
import TestApi from './components/apitest'
import TestBox from './components/test'
import CustomerAdd from './components/pollbox'

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
    
    return (
      <div>
        {/* <MainPage></MainPage> */}
        {/* <TestBox></TestBox> */}
        {/* <TestApi></TestApi> */}
        {/* {page} */}
        <ChatPage></ChatPage>
        {/* <CustomerAdd></CustomerAdd> */}
      </div>
    );
  }

}

export default App;
        