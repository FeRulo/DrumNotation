import React, { Component } from 'react';
import './KeyApp.css';
import KeyInput from './KeyInput';
import KeyShower from './KeyShower';
import Music from './Music';
import Snare from './Snare.wav'
import Title from './Title'

class KeyApp extends Component{
  componentDidMount() {
      document.addEventListener('keydown', e=>{
          this.props.store.dispatch({
              type:'KEYDOWN',
              key:e.key,
              keyCode:e.which || e.keyCode,
              keyMap: this.props.keyMap
          })
      })
      document.addEventListener('keyup', e=>{
          this.props.store.dispatch({
              type:'KEYUP',
              key: e.key,
              keyCode: e.which || e.keyCode,
              keyMap: this.props.keyMap
          })
      })
  }

  render(){
      let keyMap = this.props.keyMap
      let simpleDrumNotationBuilder = this.props.simpleDrumNotationBuilder     
      return (
        <div>
          <Title txt="Drum Notation"/>
          <KeyInput 
            simpleDrumNotationBuilder={simpleDrumNotationBuilder}
            keyMap={keyMap}/>
          <KeyShower keyMap={keyMap}/>
          <Music url={Snare}/>
        </div>
      );
  }

}

export default KeyApp;
