import React, { Component } from 'react';
import store from '../store'
import { animateScroll } from "react-scroll";


class ChatBox extends Component {
    state = {
        text_list: store.getState().text, 
        text: ""
    }
    s_url = 'ws://10.0.0.119:7779/ws/chat/newconnection/'
    connection = new WebSocket(this.s_url);

    constructor(props) {
        super(props)
        store.subscribe(function() {
            this.setState({text_list: store.getState().text});
        }.bind(this))
        this.connection.onmessage = e => {
            var t_data = JSON.parse(e.data).message
            this.setState({
                text_list: this.state.text_list.concat([t_data]) 
            })
        }
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
                <div>
                    <form action="" onSubmit={function(e){
                        e.preventDefault();
                        var obj = JSON.stringify({"message": this.state.text})
                        this.connection.send(obj)
                        this.setState({text: ""})
                    }.bind(this)}>
                        <input type="text" value={this.state.text} onChange={function(e){
                            e.preventDefault();
                            this.setState({text: e.target.value})
                        }.bind(this)}/>
                        <button type="submit">submit</button>
                    </form>
                </div>
            </nav>
      )
    }
  }

export default ChatBox;
