import React from 'react';

const KeyShower = 
  ({keyMap}) =>{
  return(
    <h1>{
      keyMap.map(k=><span>{k.key.toUpperCase()}({k.keyCode})+</span>)
    }</h1>
  )
}

export default KeyShower;
