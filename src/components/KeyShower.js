import React from 'react';

const KeyShower = 
  ({keyMap,player}) =>{
  return(
    <div>
      <h1>{
        keyMap.map((k,key)=><span key={key}>{k.key.toUpperCase()}({k.keyCode})+</span>)
      }</h1>
    </div>
  )
}

export default KeyShower;
