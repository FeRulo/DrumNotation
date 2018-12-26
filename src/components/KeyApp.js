import React from 'react';
import './KeyApp.css';
import KeyInput from './KeyInput';
import KeyShower from './KeyShower';

const KeyApp =({
  keyMap,
  simpleDrumNotationBuilder,
  store}) => {
    return (
      <div>
        <KeyInput  store={store} 
          simpleDrumNotationBuilder={simpleDrumNotationBuilder}
          keyMap={keyMap}/>
          <KeyShower keyMap={keyMap}/>
      </div>
    );
}

export default KeyApp;
