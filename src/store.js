import {createStore} from 'redux';

const initail_state = {text: []}
const myreducer = (state=initail_state, action) => {
    if (action.type === 'typed') {
        console.log('state', state.text)
        return {...state, text: state.text.concat(action.text)}
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