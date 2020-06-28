import React, { Component } from 'react';
import store from '../store'



class TestBox extends Component {

    render() {
        const handleSubmit =  function(e){
            e.preventDefault();     
           }
        const handleClick = function(){
            console.log(this.refs.inputText.getDOMNode().value) 
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input ref="inputText" />
                    <input type="submit" onClick={e => {this.handleClick}} />
                    <button onClick = {this.props.closeDialog}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default TestBox;