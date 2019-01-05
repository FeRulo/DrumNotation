import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import {combineReducers} from 'redux'
import DrumNotator from './components/DrumNotator';
import keyMap from './reducers/keyMap';
import simpleDrumNotationBuilder from './reducers/simpleDrumNotationBuilder';

const drumApp = combineReducers({
  keyMap,
  simpleDrumNotationBuilder
})
let store = createStore(drumApp)

const render = ()=>{
  
  ReactDOM.render(
    <DrumNotator 
      store={store}
      {...store.getState() }
    />,
     document.getElementById('root')
    )
}

store.subscribe(render)
render()