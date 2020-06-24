import React, { Component } from 'react';
import store from '../store'
import ls from 'local-storage'
import TestApi from "./apitest"


class ChatBox extends Component {
    state = {
        // for development mode
        text_list: [{message: "hi", opinion: 3, time: "2:12", multimedia: false, id: 61},
                    {message: "mynameis", opinion: 1, time: "2:32", multimedia: false, id: 62},
                    {message: "asjkfjdkf", opinion: 2, time: "2:22", multimedia: false, id: 63},
                    {message: "asjkfjdkf", opinion: 2, time: "2:22", multimedia: false, id: 64},
                    {message: "asjkfjdkf", opinion: 1, time: "2:22", multimedia: false, id: 65},
                    {message: "asjkfjdkf", opinion: 2, time: "2:22", multimedia: false, id: 66},
                    {message: "asjkfjdkf", opinion: 3, time: "2:22", multimedia: false, id: 67},
                    {message: "asjkfjdkf", opinion: 3, time: "2:22", multimedia: false, id: 68},
                    {message: "asjkfjdkf", opinion: 1, time: "2:22", multimedia: false, id: 69},
                    {message: "asjkfjdkf", opinion: 1, time: "2:22", multimedia: false, id: 70},
                    {message: "asjkfjdkf", opinion: 2, time: "2:22", multimedia: false, id: 71},
                    {message: "asjkfjdkf", opinion: 3, time: "2:22", multimedia: false, id: 72},
                    {message: "bye", opinion: 2, time: "2:52", multimedia: false, id: -3},],
        
        // text_list: [],
        like_list: [],
        personal_list: [],
        personal_id_list: [],
        text: "",
        tmp: {},
        connection: null,
        opinion: 3,
        filter_opinion: false,
        filter_target: 0,
        scrolltobottom: true,
        imageUrl: null,
    }

    constructor(props) {
        super(props)
        store.subscribe(function() {
            // this.setState({text_list: store.getState().text});
        }.bind(this))
    }

    scrollToBottom = () => this.messageEnd.scrollIntoView({behavior: 'auto'});

    componentDidMount() {
        // this.scrollToBottom();
        // for development mode
        if (ls.get('text_list') === null) {
            ls.set('text_list', this.state.text_list)
        }

        const s_url = 'ws://10.0.0.119:7779/ws/chat/' + store.getState().roomname + "/"
        let connection = new WebSocket(s_url)
        connection.binaryType = 'arraybuffer'


        connection.onmessage = e => {

            if (typeof(e.data) === "string") {
                let data = JSON.parse(e.data)
                let s_time = data.time
                
                if (data.type === 'chat_message') {
                    let t_data = data.message
                    let o_data = Number(data.opinion)
                    let i_data = Number(data.id)
    
                    this.setState({
                        text_list: this.state.text_list.concat({
                            message: t_data,
                            opinion: o_data,
                            time: s_time,
                            id: i_data,
                            multimedia: false,
                        }),
                        // opinion: o_data,
                    })
                    ls.set('text_list', this.state.text_list)
                    ls.set('opinion', o_data)
                } else if (data.type === 'live_like') {
                    this.setState({
                        like_list: data.like_list.map(
                            (each, idx) => {return {likeness: each[0], message: each[1], opinion: each[2], time: each[3], id: each[4]}})
                        // like_list: data.like_list,
                        // time: s_time
                    })
                    ls.set('like_list', this.state.like_list)
                } else if (data.type === 'welcome') {
                    this.setState({
                        like_list: data.like_list.map(
                            (each, idx) => {return {likeness: each[0], message: each[1], opinion: each[2], time: each[3], id: each[4]}}),
                        time: s_time
                    })
                    ls.set('like_list', this.state.like_list)
                }

            } else if (typeof(e.data) === "object") {
                var ArrayBuffer = e.data;
                var av = new Uint8Array(ArrayBuffer)
                var blob = new Blob([av], {type: 'image/jpeg'})
                var urlCreator = window.URL || window.webkitURL
                var imageUrl = urlCreator.createObjectURL(blob);

                let d = new Date();
                let h = String(d.getHours());
                let m = String(d.getMinutes()).padStart(2, '0');

                this.setState({
                    imageUrl: imageUrl,
                    text_list: this.state.text_list.concat({
                        message: imageUrl,
                        opinion: 3,
                        time: h+":"+m,
                        id: this.state.text_list.length + 1,
                        multimedia: true,
                    })
                }, () => {
                    ls.set('text_list', this.state.text_list)
                    }
                )
            }


            

        if (ls.get('text_list') === null) {
            var load_list = []
        } else {
            var load_list = ls.get('text_list')
        }

        if (ls.get('personal_list') === null) {
            var p_load_list = []
        } else {
            var p_load_list = ls.get('personal_list')
        }

        if (ls.get('opinion') === null) {
            var opinion = 3
        } else {
            var opinion = ls.get('opinion')
        }
        if (ls.get('like_list') === null) {
            var like_list = []
        } else {
            var like_list = ls.get('like_list')
        }
        if (ls.get('personal_id_list') === null) {
            var p_id_list = []
        } else {
            var p_id_list = ls.get('personal_id_list')
        }
        // if (ls.get('imageUrl') === null) {
        //     var imageUrl = ''
        // } else {
        //     var imageUrl = ls.get('imageUrl')
        // }
        this.setState({
            connection: connection,
            text_list: load_list,
            personal_list: p_load_list,
            personal_id_list: p_id_list,
            text: ls.get('text'),
            opinion: opinion,
            like_list: like_list,
            filter_opinion: ls.get('filter_opinion'),
            filter_target: ls.get('filter_target'),
            scrolltobottom: ls.get('scrolltobottom')
        })

        // this.scrollToBottom();
        }
    }
    componentDidUpdate() {
        if (this.state.scrolltobottom === true) {
            this.scrollToBottom();
        }
    }

    setOpinion = (e) => {
        let val = e.target.value
        e.preventDefault();
        this.setState({opinion: val})
        ls.set('opinion', val)
    }

    setOpinionFilter = (e) => {
        let val = Number(e.target.value)
        e.preventDefault();
        if (val > 0) {
            var f_o = true
        } else {
            var f_o = false
        }
        this.setState({
            filter_opinion: f_o,
            filter_target: val
        })
        ls.set('filter_opinion', f_o)
        ls.set('filter_target', val)
    }

    handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        console.log('leave')
    };
    handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();

        let p_list = this.state.personal_list
        let p_id_list = this.state.personal_id_list

        if (this.state.personal_id_list.includes(this.state.tmp.id)) {
            console.log('duplicated')
        } else {
            this.setState({
                personal_list: this.state.personal_list.concat(this.state.tmp),
                personal_id_list: this.state.personal_id_list.concat(this.state.tmp.id)
            })
        }

        ls.set('personal_list', p_list.concat(this.state.tmp))
        ls.set('personal_id_list', p_id_list.concat(this.state.tmp.id))
    };

    render() {
        const mystyle = {
            border: 'solid',
            height: '500px',
            width: '700px',
            overflow: "auto",
            borderRadius: "15px",
        }

        const op_colorScheme = ['coral', 'burlywood', 'grey']
        const op_alignScheme_text = ['left', 'right', 'center']
        const op_alignScheme_eachchat = ['flex-start', 'flex-end', 'center']

        if (this.state.filter_opinion === true) {
            var data = this.state.text_list.filter(d => d.opinion === this.state.filter_target);
        } else {
            var data = this.state.text_list;
        }
        var likedData = this.state.like_list;

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                // backgroundColor: 'green',
                margin: '10px 10px 10px 10px'
            }}>
            <nav>
                dialog window
                {/* dialog window */}
                <div 
                    onScroll={function(e){
                        e.preventDefault();
                        if (this.state.scrolltobottom===true) {
                            if (e.target.scrollTop + e.target.clientHeight !== e.target.scrollHeight) {
                                this.setState({scrolltobottom: false})
                                ls.set('scrolltobottom', false)
                            }
                        }
                    }.bind(this)}
                    style={mystyle} 
                    id="myelem"
                >
                    {data.map((d, idx)=>
                        <div style={{
                                display: 'flex',
                                justifyContent: op_alignScheme_eachchat[d.opinion-1],
                                width: "95%", 
                                overflow: 'visible', 
                                // boxSizing: 'border-box',
                                margin: "10px 10px 10px 10px",
                                // alignContent: 'right',  
                                // textAlign: 'right',
                            }} 
                            key={`Chat_${idx}`}>

                                {/* each chat box */}
                                <div
                                    draggable={true}

                                    onDragStart={function(e) {
                                        this.setState({
                                            tmp: {
                                                message: d.message,
                                                opinion: d.opinion,
                                                time: d.time,
                                                id: d.id
                                            }
                                        })
                                        }.bind(this)}
                                    onDragLeave={e => this.handleDragLeave(e)}
                                    
                                    style={{
                                        display: 'flex',
                                        // justifyContent: 'space-between',
                                        MozWindowDragging: 'drag',
                                        borderRadius: "5px",
                                        width: '65%',
                                        backgroundColor: op_colorScheme[d.opinion-1],                            
                                    }}>

                                    {/* chat box text area */}
                                    {d.multimedia ? 
                                    <p style={{
                                        wordBreak: 'break-all',
                                        // display: 'inline-block',
                                        // whiteSpace: 'unset',
                                        borderRadius: "5px",
                                        margin: "10px 10px 10px 10px",
                                        textAlign: op_alignScheme_text[d.opinion-1],
                                    }}>
                                        <img
                                        style={{
                                            width: '75%',
                                            height: '100%'
                                        }}
                                        src={d.message}/></p>
                                    :
                                    <p style={{
                                        wordBreak: 'break-all',
                                        // display: 'inline-block',
                                        // whiteSpace: 'unset',
                                        borderRadius: "5px",
                                        margin: "10px 10px 10px 10px",
                                        textAlign: op_alignScheme_text[d.opinion-1],
                                    }}>{d.message}</p>
                                    }

                                    <div>
                                        {/* time */}
                                        <p style={{textAlign: 'center'}}>{d.time}</p>
                                        {/* like */}
                                        <button onClick={function(e){
                                            e.preventDefault();
                                            var obj = JSON.stringify({
                                                "type": "live_like",
                                                "message": d.message,
                                                "opinion": d.opinion,
                                                'time': d.time,
                                                "likeness": 1,
                                                'id': d.id
                                            })
                                            this.state.connection.send(obj)
                                        }.bind(this)}>like</button>
                                        {/* dislike */}
                                        <button onClick={function(e){
                                            e.preventDefault();
                                            var obj = JSON.stringify({
                                                "type": "live_like",
                                                "message": d.message,
                                                "opinion": d.opinion,
                                                'time': d.time,
                                                "likeness": -1,
                                                'id': d.id
                                            })
                                            this.state.connection.send(obj)
                                        }.bind(this)}>dislike</button>
                                    </div>
                                </div>
                        </div>
                        
                        )}
                    <div style={{height: "1px", width: '1px', clear: 'both'}}
                        ref={(el) => {this.messageEnd = el}}></div>
                </div>


                {/* message submit box*/}
                <div style={{
                    border: 'solid 2px',
                    height: "100px",
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}>
                    <form 
                    style={{
                        width: '70%',
                        height: '100%',
                        border: 'solid 2px blue'
                    }}
                    action="" 
                    onSubmit={function(e){
                        e.preventDefault();
                        let d = new Date();
                        let h = String(d.getHours());
                        let m = String(d.getMinutes()).padStart(2, '0');

                        var obj = JSON.stringify({
                            "type": "chat_message",
                            "message": this.state.text,
                            "opinion": this.state.opinion,
                            'time': h+':'+m,
                        })
                        this.state.connection.send(obj)
                        this.setState({text: "", scrolltobottom: true})
                        ls.set('text', "")
                    }.bind(this)}>
                        <input 
                            type="text" 
                            value={this.state.text} 
                            style={{width: '99%', height: '70%'}}
                            onChange={function(e){
                                e.preventDefault();
                                this.setState({text: e.target.value})
                                ls.set('text', e.target.value)
                            }.bind(this)}/>
                        {/* <button type="submit">submit</button> */}
                    </form>
                    
                    {/* picture file send */}
                    <input 
                    style={{
                        border: 'solid 2px',
                        width: '20%',
                        height: '100%',
                        overflow: 'auto'
                    }}
                    type="file"
                    title=""
                    onInput={e => {
                        e.preventDefault();
                        var reader = new FileReader();
                        var rawData = new ArrayBuffer();
                        reader.onloadend = function() {};
                        reader.onload = (e) => {
                            rawData = e.target.result;
                            this.state.connection.send(rawData)
                        }
                        reader.readAsArrayBuffer(e.target.files[0])
                    }}/>

                    {/* select opinion */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'solid 2px blue',
                        height: '100%'
                    }}>
                        <span style={{
                            height: '25%',
                            fontSize: 'small',
                            textAlign: 'center'
                        }}>send mode</span>  
                        <button class="btn" style={{
                            backgroundColor: "coral",
                            width: '100%',
                            height: '25%'
                        }} value="1"
                            onClick={function(e){
                                this.setOpinion(e);
                            }.bind(this)}>agree</button>
                        <button class="btn" style={{
                            backgroundColor: 'grey',
                            width: '100%',
                            height: '25%'
                        }} value="3"
                            onClick={function(e){
                                this.setOpinion(e);
                            }.bind(this)}>unsettled</button>
                        <button class="btn" style={{
                            backgroundColor: "burlywood",
                            width: '100%',
                            height: '25%'
                        }} value="2"
                            onClick={function(e){
                                this.setOpinion(e);
                            }.bind(this)}>disagree</button>
                    </div>

                    {/* filter opinion */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'solid 2px blue'
                    }}>
                        <span style={{
                            height: '20%',
                            fontSize: 'small',
                            textAlign: 'center'
                        }}>filter</span>  
                        <button class="btn" style={{
                            backgroundColor: "coral",
                            width: '100%',
                            height: '20%'
                        }} value="1"
                            onClick={function(e){
                                this.setOpinionFilter(e);
                            }.bind(this)}>agree</button>
                        <button class="btn" style={{
                            backgroundColor: 'grey',
                            width: '100%',
                            height: '20%'
                        }} value="3"
                            onClick={function(e){
                                this.setOpinionFilter(e);
                            }.bind(this)}>unsettled</button>
                        <button class="btn" style={{
                            backgroundColor: "burlywood",
                            width: '100%',
                            height: '20%'
                        }} value="2"
                            onClick={function(e){
                                this.setOpinionFilter(e);
                            }.bind(this)}>disagree</button>
                        <button class="btn" style={{
                            backgroundColor: "green",
                            width: '100%',
                            height: '20%'
                        }} value="0"
                            onClick={function(e){
                                this.setOpinionFilter(e);
                            }.bind(this)}>cancel</button>
                    </div>

                    {/* clear */}
                    <button style={{
                        width: '10%',
                        height: '100%',
                        border: 'solid 2px blue'

                    }}
                            onClick={function(e){
                                localStorage.clear();

                                this.setState({
                                    text: "",
                                    text_list: [],
                                    opinion: 1,
                                    like_list: [],
                                }, () => {console.log(this.state.text)})
                            }.bind(this)}>cache clear</button>

                </div>
                    
                {/* <button onClick={function(){
                    this.connection.close();
                    store.dispatch({type: "return", mode: "main"});
                }.bind(this)}>return to main page</button> */}
            </nav>
            <div>
                likedlist
                {/* likedlist live vote */}
                <div style={{
                                border: 'solid',
                                height: '500px',
                                width: '250px',
                                overflow: "auto",
                                borderRadius: '15px',
                            }} id="pollelem">
                        {likedData.map((d, idx)=>
                            <div style={{
                                    display: 'inline-block',
                                    width: "90%", 
                                    borderRadius: "5px",
                                    overflow: 'visible', 
                                    margin: "10px 10px 10px 10px",
                                    backgroundColor: op_colorScheme[d.opinion-1],
                                }}
                                key={`Chat_${idx}`}>
                                    <p style={{
                                        wordBreak: 'break-all',
                                        margin: "10px 10px 10px 10px",
                                    }}>liked {d.likeness} : {d.message}</p>
                                    {/* <button onClick={function(e){
                                    e.preventDefault();
                                    var obj = JSON.stringify({
                                        "type": "live_like",
                                        "message": d[1],
                                        "opinion": d[2],
                                        'id': d[3]
                                    })
                                    this.state.connection.send(obj)
                                }.bind(this)}>like</button> */}

                                    <div>
                                        {/* time */}
                                        <p style={{textAlign: 'center'}}>{d.time}</p>
                                        {/* like */}
                                        <button onClick={function(e){
                                            e.preventDefault();
                                            var obj = JSON.stringify({
                                                "type": "live_like",
                                                "message": d.message,
                                                "opinion": d.opinion,
                                                'time': d.time,
                                                "likeness": 1,
                                                'id': d.id
                                            })
                                            this.state.connection.send(obj)
                                        }.bind(this)}>like</button>
                                        {/* dislike */}
                                        <button onClick={function(e){
                                            e.preventDefault();
                                            var obj = JSON.stringify({
                                                "type": "live_like",
                                                "message": d.message,
                                                "opinion": d.opinion,
                                                'time': d.time,
                                                "likeness": -1,
                                                'id': d.id
                                            })
                                            this.state.connection.send(obj)
                                        }.bind(this)}>dislike</button>
                                    </div>

                            </div>
                        )}
                </div>
            </div>

            <div>
                personal container
                {/* personal container  */}
                <div 
                    onDrop={e => this.handleDrop(e)}
                    onDragOver={e => this.handleDragOver(e)}
                    onDragEnter={e => this.handleDragEnter(e)}
                    onDragLeave={e => this.handleDragLeave(e)}

                    style={{
                            border: 'solid',
                            height: '500px',
                            width: '250px',
                            overflow: "auto",
                            borderRadius: '15px',
                    }} 
                    id="personalctn"
                >
                        {this.state.personal_list.map((d, idx)=>
                        <div style={{
                                display: 'inline-block',
                                width: "90%", 
                                borderRadius: "5px",
                                overflow: 'visible', 
                                margin: "10px 10px 10px 10px",
                                backgroundColor: op_colorScheme[d.opinion-1],
                            }} 
                            key={`Chat_${idx}`}>
                                <p style={{
                                    wordBreak: 'break-all',
                                    margin: "10px 10px 10px 10px",
                                }}>{d.message}</p>
                                <div>
                                    {/* time */}
                                    <p style={{textAlign: 'center'}}>{d.time}</p>
                                    {/* delete */}
                                    <button onClick={function(e){
                                        e.preventDefault();
                                        console.log('clicked')
                                        let p_list = this.state.personal_list
                                        let p_id_list = this.state.personal_id_list

                                        // let a = [ {f1: 1, f2: 2}, {f1: 3, f2: 4} ] 
                                        const idx = p_id_list.findIndex(
                                            function(item) {
                                                return item === d.id})
                                        if (idx > -1) {p_list.splice(idx, 1); this.setState({personal_list: p_list})}
                                        if (idx > -1) {p_id_list.splice(idx, 1); this.setState({personal_id_list: p_id_list})}
                                        
                                    }.bind(this)}>delete</button>
                                </div>

                            </div>
                        )}
                </div>
            </div>

        <TestApi></TestApi>
        </div>
      )
    }
  }

export default ChatBox;
