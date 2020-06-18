import React, { Component } from 'react';
import store from '../store'
import ls from 'local-storage'


class ChatBox extends Component {
    state = {
        text_list: [],
        text: "",
        connection: null,
        opinion: 3,
    }

    constructor(props) {
        super(props)
        store.subscribe(function() {
            // this.setState({text_list: store.getState().text});
        }.bind(this))
    }

    scrollToBottom = () => this.messageEnd.scrollIntoView({behavior: 'auto'});
    componentDidMount() {
        const s_url = 'ws://10.0.0.119:7779/ws/chat/' + store.getState().roomname + "/"
        let connection = new WebSocket(s_url)
        connection.onmessage = e => {
            var t_data = JSON.parse(e.data).message
            var o_data = JSON.parse(e.data).opinion

            this.setState({
                text_list: this.state.text_list.concat([t_data]),
                opinion: o_data,
            })
            ls.set('text_list', this.state.text_list)
            ls.set('opinion', o_data)
        }

        if (ls.get('text_list') === null) {
            var load_list = []
        } else {
            var load_list = ls.get('text_list')
        }
        
        this.setState({
            connection: connection,
            text_list: load_list,
            text: ls.get('text'),
            opinion: ls.get('opinion')
        })
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }

    setOpinion = (e) => {
        let val = e.target.value
        e.preventDefault();
        this.setState({opinion: val})
        ls.set('opinion', val)
    }

    render() {
        const mystyle = {
            border: 'solid',
            height: '500px',
            width: '500px',
            overflow: "auto"
        }

        var data = this.state.text_list;
        return (
            <nav>
                <ul style={mystyle} id="myelem">
                    {data.map((d, idx)=><p style={{maxWidth: "70%", overflow: 'visible'}} key={`TestChat_${idx}_${d}`}>{d}</p>)}
                    <div style={{height: "1px", width: '1px', clear: 'both'}}
                        ref={(el) => {this.messageEnd = el;}}></div>
                </ul>
                <div>
                    <form action="" onSubmit={function(e){
                        e.preventDefault();
                        var obj = JSON.stringify({
                            "message": this.state.text,
                            "opinion": this.state.opinion
                        })
                        this.state.connection.send(obj)
                        this.setState({text: ""})
                        ls.set('text', "")
                    }.bind(this)}>
                        <input type="text" value={this.state.text} onChange={function(e){
                            e.preventDefault();
                            this.setState({text: e.target.value})
                            ls.set('text', e.target.value)
                        }.bind(this)}/>
                        <button type="submit">submit</button>
                    </form>
                    
                    <div>
                        <button style={this.button_style} value="1"
                            onClick={function(e){
                                this.setOpinion(e);
                            }.bind(this)}>1</button>
                        <button style={this.button_style} value="2"
                            onClick={function(e){
                                this.setOpinion(e);
                            }.bind(this)}>2</button>
                        <button style={this.button_style} value="3"
                            onClick={function(e){
                                this.setOpinion(e);
                            }.bind(this)}>3</button>
                    </div>
                    <button style={this.button_style}
                            onClick={function(e){
                                localStorage.clear();
                                this.setState({
                                    text: "",
                                    text_list: [],
                                    opinion: 1,
                                })
                            }.bind(this)}>clear</button>
                </div>
                    
                {/* <button onClick={function(){
                    this.connection.close();
                    store.dispatch({type: "return", mode: "main"});
                }.bind(this)}>return to main page</button> */}
            </nav>
      )
    }
  }

export default ChatBox;
