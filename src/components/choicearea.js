import React, { Component } from 'react';
import store from '../store'


class ChoiceArea extends Component {
    state = {roomname: ""}

    constructor(props) {
        super(props)
        store.subscribe(function() {
            // this.setState({roomname: store.getState().roomname})
        }.bind(this))
    }

    mystyle = {
        backgroundColor: 'brown',
        display: 'flex',
        height: '100%',
        justifyContent: "space-around",
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
    }
    render() {
        return (
            <div style={this.mystyle}>
                <div>
                    <button>Upcoming</button>
                </div>
                <div>
                    <p>some text will be written</p>
                </div>
                <div>
                    <form action="/chat" onSubmit={function(e){
                        e.preventDefault();
                        store.dispatch({
                            type:'typed', 
                            roomname: this.state.roomname
                        })
                        this.setState({roomname: ""})
                    }.bind(this)}>
                    type your room name
                        <input type="text" 
                            value={this.state.roomname}
                            onChange={function(e) {
                                e.preventDefault();
                                console.log(e.target.value)
                                this.setState({roomname: e.target.value})
                            }.bind(this)}/>
                        <button>Enter the Room!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChoiceArea;