import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import ListTodos from './components/todos/ListTodos'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux';

import rootReducer from './store/reducers/rootReducer';


// reducer is just a fn that interacts with store
// const initialState = {
//     tasks: ['Buy Milk']
// }
// function myReducer(state = initialState, action) {
//     console.log(state)
//     console.log(action)
// }

// const store = createStore(myReducer)

// // action
// const addTaskAction = {
//     type: 'ADD_TASK',
//     task: 'See doc'
// }

// store.dispatch(addTaskAction)

//  subscribing to state change
// store.subscribe(() => {
//     console.log(state)
// })

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ?  window.devToolsExtension(): f => f
  )
)

ReactDOM.render(<Provider store={store}> < App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
