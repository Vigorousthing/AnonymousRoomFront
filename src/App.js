import React, { Component } from 'react';
import MainPage from './components/mainpage'
import './App.css';


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
  render() {
    return (
      <div>
        <MainPage></MainPage>
      </div>
    );
  }
}

export default App;

        