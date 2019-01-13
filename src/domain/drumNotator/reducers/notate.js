import {contains,
  kick1KeyCombination,
  snare1KeyCombination,
  snare2KeyCombination,
  kick0KeyCombination } from '../vos/keyConstantValues'


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
  snare1: 0,
  snare2: 0,
  kick0: 0,
  kick1: 0
}], action={type:'NONE',keyMap:[]}) =>{
  let keys = [action.key,...action.keyMap.map(k=>k.key)].filter((k,i,self)=>self.indexOf(k)===i)
  return [
      {...state[0],
        snare1: state[0].snare1 ^ getBinariesByKeyCombinations(keys,snare1KeyCombination),
        kick0: state[0].kick0 ^ getBinariesByKeyCombinations(keys,kick0KeyCombination),
      }, 
      ...state.slice(1)]
}

export default notate