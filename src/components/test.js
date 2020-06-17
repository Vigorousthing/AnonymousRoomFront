import React, { Component } from 'react';
import store from '../store'
import { animateScroll } from "react-scroll";


class TestChat extends Component {    
    state = {text_list: store.getState().text}
    constructor(props) {
        super(props)
        store.subscribe(function() {
            this.setState({text_list: store.getState().text});
        }.bind(this))
    }

    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: "myelem"
        });
    }

    render() {
        const mystyle = {
            border: 'solid',
            height: '300px',
            width: '50%',
            overflow: "scroll"
        }

        var data = this.state.text_list;

        return (
            <nav>
                <ul style={mystyle} id="myelem">
                    {data.map((d, idx)=><p key={`TestChat_${idx}_${d}`}>{d}</p>)}
                </ul>
            </nav>
      )
    }
  }

export default TestChat;
