import React, { Component } from 'react';
import store from '../store'
import ChatPage from '../components/chatpage'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";


// class MakeRoomArea extends Component {
//     mystyle = {
//         display: 'flex',
//         height: '100px',
//         justifyContent: "center",
//         width: '100%',
//         alignItems: 'center',
//     }
//     state = {text: ""}
//     render() {
//         return (
//             <div style={this.mystyle}>
//                 <form action="http://10.0.0.119:7779/chat/myroom" onSubmit={function(e){
//                     // e.preventDefault();
//                     var val = this.state.text
//                     // axios.get(
//                     //     'http://10.0.0.119:7779/chat/' + val, 
//                     //     // { params:{a: val}}
//                     //     ).then(
//                     //         function (response){
//                     //             console.log(response);}
//                     //             ).catch(
//                     //                 function (error){})
//                     this.setState({text: ""})

//                 }.bind(this)}>
//                 type your room name
//                     <input type="text" 
//                         value={this.state.roomname}
//                         onChange={function(e) {
//                             e.preventDefault();
//                             this.setState({roomname: e.target.value})
//                         }.bind(this)}/>
//                     <button>Make Room!</button>
//                 </form>
//             </div>
//         )
//     }
// }



// export default MakeRoomArea;

class MakeRoomArea extends Component {
    state = {roomname: ""}

    constructor(props) {
        super(props)
        store.subscribe(function() {
            // this.setState({roomname: store.getState().roomname})
        }.bind(this))
    }

    mystyle = {
        backgroundColor: 'green',
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

export default MakeRoomArea;