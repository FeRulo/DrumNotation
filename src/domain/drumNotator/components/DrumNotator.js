import React, { Component } from 'react';
import './DrumNotator.css';
import Page from './Page';
import KeyShower from './KeyShower';
import Title from './Title'
import DrumPlayer from '../../drumPlayer/components/DrumPlayer';

class DrumNotator extends Component{
    componentDidMount() {
        document.addEventListener('keydown', e=>{
            this.props.store.dispatch({
                type:'KEYDOWN',
                key:e.key,
                keyCode:e.which || e.keyCode,
                keyMap: this.props.keyMap,
                notation: this.props.simpleDrumNotationBuilder.notation
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
      let player = this.props.player
      return (
        <div>
          <Title txt="Drum Notation"/>
          <Page 
            simpleDrumNotationBuilder={simpleDrumNotationBuilder}
            keyMap={keyMap}/>
          <KeyShower keyMap={keyMap} />
          <DrumPlayer store={this.props.store} 
            player={player} 
            notation={simpleDrumNotationBuilder.notation}/>
        <input type='txt'/>
        </div>
      );
  }

}

export default DrumNotator;
