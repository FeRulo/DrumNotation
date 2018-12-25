import React from 'react';
import './KeyApp.css';
import KeyInput from './KeyInput';
import KeyShower from './KeyShower';
import Letter from './Letter';

const KeyApp =({
  keyMap,
  simpleDrumNotationBuilder,
  store}) => {
    return (
      <div>
        <KeyInput  store={store} 
          simpleDrumNotationBuilder={simpleDrumNotationBuilder}/>
        <KeyShower keyMap={keyMap}/>
        <Letter {...simpleDrumNotationBuilder}/>
      </div>
    );
}

export default KeyApp;
