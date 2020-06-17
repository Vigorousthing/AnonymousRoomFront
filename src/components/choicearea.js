import React, { Component } from 'react';


class ChoiceArea extends Component {
    mystyle = {
        backgroundColor: 'brown',
        display: 'flex',
        height: '100%',
        justifyContent: "space-around",
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
    }
    state = {text: ''}
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
                        var val = this.state.text
                        console.log(val)
                        this.setState({text: ""})
                    }.bind(this)}>
                    type your room name
                        <input type="text" 
                            value={this.state.text}
                            onChange={function(e) {
                                e.preventDefault();
                                this.setState({text: e.target.value})
                            }.bind(this)}/>
                        <button>Enter the Room!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChoiceArea;