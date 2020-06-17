import React, { Component } from 'react';
import TitleArea from '../components/titlearea'
import MakeRoomArea from '../components/makeroomarea'
import ChoiceArea from '../components/choicearea'


class MainPage extends Component {
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
        <TitleArea></TitleArea>
        <MakeRoomArea></MakeRoomArea>
        <ChoiceArea></ChoiceArea>
      </div>
    );
  }
}

export default MainPage;

        