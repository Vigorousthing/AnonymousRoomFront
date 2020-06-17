import React, { Component } from 'react';


class TitleArea extends Component {
    mystyle = {
        color: 'black',
        display: 'flex',
        height: '150px',
        justifyContent: "center",
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
    }
    render() {
        return (
            <header style={this.mystyle}>
                <h1 style={this.mystyle}>Anonymous Room</h1>
            </header>
        )
    }
}



export default TitleArea;