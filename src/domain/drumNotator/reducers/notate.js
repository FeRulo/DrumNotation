import {contains,
  bits,
  kick1KeyCombination,
  snare1KeyCombination,
  snare2KeyCombination,
  kick0KeyCombination } from '../vos/keyConstantValues'


const getBinaries =(keyMap=[], combinations, bits)=>{
  if(combinations.length>0 && keyMap.length>0){
    return ( combinations[0].every(k=>contains(keyMap,k)) && 
            combinations[0].length===keyMap.length? 
            bits[0]: 0 ) 
    + getBinaries(keyMap,combinations.slice(1),bits.slice(1))
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
        snare1: state[0].snare1 ^ getBinaries(keys,snare1KeyCombination,bits),
        snare2: state[0].snare2 ^ getBinaries(keys,snare2KeyCombination,bits),
        kick0: state[0].kick0 ^ getBinaries(keys,kick0KeyCombination,bits),
        kick1: state[0].kick1 ^ getBinaries(keys,kick1KeyCombination,bits),
      }, 
      ...state.slice(1)]
}

export default notate