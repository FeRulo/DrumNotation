import {contains,
  snareKeyCombination,
  kickKeyCombination } from '../vos/keyConstantValues'


const getBinariesByKeyCombinations =(keyMap=[], combinations)=>{
  if(combinations.length>0 && keyMap.length>0){
    return ( combinations[0].keys.every(k=>contains(keyMap,k)) && 
            combinations[0].keys.length===keyMap.length? 
            combinations[0].binaryValue: 0 ) 
    + getBinariesByKeyCombinations(keyMap,combinations.slice(1))
  } 
  else return 0
}

const notate = (state = [{
  snare: 0,
  kick: 0
}], action={type:'NONE',keyMap:[]}) =>{
  let keys = [action.key,...action.keyMap.map(k=>k.key)].filter((k,i,self)=>self.indexOf(k)===i)
  return [
      {...state[0],
        snare: state[0].snare ^ getBinariesByKeyCombinations(keys,snareKeyCombination),
        kick: state[0].kick ^ getBinariesByKeyCombinations(keys,kickKeyCombination),
      }, 
      ...state.slice(1)]
}

export default notate