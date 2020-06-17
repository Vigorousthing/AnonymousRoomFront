import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler} from 'react-router'
import axios from "axios";


class MakeRoomArea extends Component {
    mystyle = {
        display: 'flex',
        height: '100px',
        justifyContent: "center",
        width: '100%',
        alignItems: 'center',
    }
    state = {text: ""}
    render() {
        return (
            <div style={this.mystyle}>
                <form action="http://10.0.0.119:7779/chat/myroom" onSubmit={function(e){
                    // e.preventDefault();
                    var val = this.state.text
                    // axios.get(
                    //     'http://10.0.0.119:7779/chat/' + val, 
                    //     // { params:{a: val}}
                    //     ).then(
                    //         function (response){
                    //             console.log(response);}
                    //             ).catch(
                    //                 function (error){})
                    this.setState({text: ""})

                }.bind(this)}>
                type your room name
                    <input type="text" 
                        value={this.state.text}
                        onChange={function(e) {
                            e.preventDefault();
                            this.setState({text: e.target.value})
                        }.bind(this)}/>
                    <button>Make Room!</button>
                </form>
            </div>
        )
    }
}



export default MakeRoomArea;