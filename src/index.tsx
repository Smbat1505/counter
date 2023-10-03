import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
//import {loadState, saveState} from './storage/localStorage';
//import {createStore} from 'redux';
//import counterWithRedux from './components/CounterWithRedux';
//import {throttle} from 'lodash';
import CounterWithRedux from "./components/CounterWithRedux";
import store from "./reducer/store";
import App from "./App";

//const persistedState = loadState();
//const store = createStore(counterWithRedux, persistedState);

// store.subscribe(
//   throttle(() => {
//       saveState({
//           count: store.getState(),
//        });
//   }, 1000)
//);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
