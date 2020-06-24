import React, { Component } from 'react';
import store from '../store'



class TestBox extends Component {
    state = {
        file:'',
        urlfile: "",
        connection: null,
    }

    componentDidMount() {
        const s_url = 'ws://10.0.0.119:7779/ws/chat/' + store.getState().roomname + "/"
        var connection = new WebSocket(s_url)
        connection.binaryType = "arraybuffer"
        connection.onmessage = e => {
            var arrayBuffer = e.data;
            console.log(arrayBuffer)

            var av = new Uint8Array(arrayBuffer)
            var blob = new Blob([av], {type: 'image/jpeg'})
            var urlCreator = window.URL || window.webkitURL
            var imageUrl = urlCreator.createObjectURL(blob);
            var img = document.querySelector('#imgtest')
            img.src = imageUrl;
            console.log('received')
        }


        this.setState({connection: connection})
    }

    render() {
        var reader = new FileReader();
        var rawData = new ArrayBuffer();
        reader.onloadend = function() {};
        reader.onload = function (e) {
            rawData = e.target.result;
            this.state.connection.send(rawData)
        }.bind(this);
        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    
                    let obj = JSON.stringify({
                        type: 'multimedia',
                        content: this.state.file
                        // content: "hi"
                    })
                    console.log(obj.content)
                    reader.readAsArrayBuffer(this.state.file)

                    
                }}>
                    <input type="file" onInput={e => {
                        e.preventDefault();
                        this.setState({
                            file: e.target.files[0],
                            urlfile: URL.createObjectURL(e.target.files[0])
                        })
                        console.log("file loaded", e.target.files[0])
                    }}/>
                    <button type='submit'>mybutton</button>

                </form>
                <div>idx
                    <img 
                        style={{
                            width: "100px",
                            height: "100px",
                        }}
                        src={this.state.urlfile} alt=""
                        />
                </div>
                response image
                <img id="imgtest" src="" alt=""/>
            </div>
        )
    }
}

export default TestBox;