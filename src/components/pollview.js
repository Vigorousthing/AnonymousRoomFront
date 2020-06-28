import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import store from '../store'


const styles = theme => ({
    hidden: {
        display: 'none'
    }
});


class VotePoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.poll_info.post.title,
            poll_items: this.props.poll_info.post.poll_items,
            vote_state: this.props.poll_info.vote_state,
            poll_id: this.props.poll_info.post.id,
            selected_idx: null,
            end: this.props.poll_info.post.end, 
            open: false,
            p_list_idx: this.props.p_idx,
        }
        this.handleFormVote = this.handleFormVote.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);

    }

    handleFormVote(e) {
        e.preventDefault()
        if (this.state.end === true || this.state.selected_idx === null) {
            return
        }
        let connection = store.getState().connection

        let poll_info = JSON.stringify({
            type: 'poll_vote',
            id: this.state.poll_id,
            vote_idx: this.state.selected_idx,
        })

        connection.send(poll_info)

        this.setState({
            end: store.getState().poll_info_list[this.state.p_list_idx].post.end
        })
        // store.dispatch({type:'POLLSUBMIT', poll_info: {title: this.state.title, poll_items: this.state.poll_items}})
        // this.setState({
            // title: '',
            // poll_items: [],
            // open: false
        // })
    }

    handleClickOpen() {
        this.setState({
            // title: '',
            // poll_items: [],
            selected_idx: 0,
            open: true
        });
    }

    handleClose() {
        this.setState({
            // title: '',
            // poll_items: [],
            selected_idx: 0,
            open: false
        })
    }

    render() {
        // const { classes } = this.props;
        return (
            <div>
                {/* <Button variant="contained" color="primary" onClick={this.handleClickOpen}> */}
                
                {/* </Button> */}

                <button 
                    onClick={this.handleClickOpen}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    >
                    {this.state.title}
                </button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    {/* <DialogTitle></DialogTitle> */}
                    <DialogContent>
                        {/* <TextField label="title" type="text" name="userName" value={this.state.title} 
                            onChange={(e) => {
                                e.preventDefault();
                                this.setState({
                                    title: e.target.value
                                })                                
                            }} /><br/> */}
                        {/* <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br/> */}
                        <h4 style={{textAlign: 'center'}}>{this.state.title}</h4>
                        {this.state.poll_items.map((each, idx) => 
                            //     <TextField label={idx+1} type="text" name={idx} key={`item_${idx}`} value={this.state.poll_items[idx].text} 
                            //     onChange={function(e){
                            //         e.preventDefault();
                            //         let items = [...this.state.poll_items];
                            //         items[e.target.name] = {
                            //             id: items[e.target.name].id, 
                            //             text: e.target.value
                            //         };
                            //         this.setState({
                            //             poll_items : items
                            //         });
                            //     }.bind(this)}/><br/>
                            this.state.end ? 
                            <div>{each.text}{" : "}{this.state.vote_state[idx]}</div> 
                            :
                            <React.Fragment>
                                <button 
                                style={{
                                    width: '100%',
                                    color: this.state.selected_idx === idx ? 'red': 'black',
                                }}
                                onClick={(e)=> {
                                    e.preventDefault();
                                    this.setState({
                                        selected_idx: idx
                                    })
                                }}
                                >{each.text}</button><br/>
                            </React.Fragment>
                        )}

                        {/* // */}
                        {/* <TextField label="title" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> */}
                        
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormVote}>vote</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default withStyles(styles)(VotePoll)

