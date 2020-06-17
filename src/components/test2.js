import React, { Component } from 'react';
import store from '../store'

class SendM extends Component {
    state = {text: ""}
    render() {
        return (
            <div>
                <form action="" onSubmit={function(e){
                    e.preventDefault();
                    store.dispatch({type: 'typed', text: this.state.text})
                    this.setState({text: ""})
                }.bind(this)}>
                    <input type="text" value={this.state.text} onChange={function(e){
                        e.preventDefault();
                        this.setState({text: e.target.value})
                    }.bind(this)}/>
                    <button type="submit">submit</button>
                </form>
            </div>
      )
    }
  }

export default SendM;
