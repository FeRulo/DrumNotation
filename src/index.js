import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import KeyApp from './components/KeyApp';
import KeyMap from './reducers/KeyMap';

let store = createStore(KeyMap)

const render = ()=>{
  ReactDOM.render(
    <KeyApp keyMap={store.getState()} store={store}/>,
     document.getElementById('root')
    )
}

store.subscribe(render)
render()