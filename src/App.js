import React, { Component } from 'react';
import MainPage from './components/mainpage'
import ChatPage from './components/chatpage'
import './App.css';
import store from './store'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ChatBox from './components/chatbox';


class App extends Component {
  outer_style = {
    justify_content: 'center',
    width: "100%",
  }
  inner_style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

  constructor(props) {
    super(props)
    store.subscribe(function() {
        // this.setState({roomname: store.getState().roomname})
    }.bind(this))
  }

  render() {
    return (
      <div>
      {/* <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
      </header>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/about" component={ChatPage} />
          {/* <Route component={NotFound} /> */}
        {/* </Switch>
      </main>
      </Router> */}
        <ChatPage></ChatPage>
        {/* <MainPage></MainPage> */}
        {/* <ChatPage></ChatPage> */}
      </div>
    );
  }
}

export default App;

        