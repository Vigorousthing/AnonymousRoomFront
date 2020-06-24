import {createStore} from 'redux';

const initail_state = {
    roomname: "myroom", 
    mode: "main"
}

const myreducer = (state=initail_state, action) => {
    if (action.type === 'typed') {
        return {...state, roomname: action.roomname, mode: "chat"}
    } else if (action.type === 'return') {
        return {...state, mode: "main"}
    }
    return state;
}
const store = createStore(myreducer)

export default store;

// export default createStore(function(state, action){
//     if (state===undefined){
//         return {text: []}
//     }
//     if (action.type === 'typed') {
//         console.log(state.text)
//         return {...state, text: state.text.concat(action.text)}
//     }
//     return state;
// }, 
// window.__REDUX_DEVTOOLS_EXTENSION__ && 
// window.__REDUX_DEVTOOLS_EXTENSION__())
