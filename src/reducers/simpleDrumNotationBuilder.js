import keyMap from './keyMap'
import notate from './notate'

const iterate = (state = [0], action={type:'NONE'}, index = 0) =>{
  switch (action.type) {
    case 'KEYUP': 
      switch(action.keyCode){
        case 32: return [...state.slice(0,index),0,...state.slice(index)]
        case 8: return [...state.slice(0,index),...state.slice(index+1)]
        default: return [...state.slice(0,index),...notate(state.slice(index),action)]
      }
    default:
      return state
  }
}

const moveIndex = (state = 0, action={type:'NONE'},limit = 1) =>{
  switch (action.type) {
    case 'KEYUP': 
      console.log("limit "+limit + " state: "+state)
      switch(action.keyCode){
          case 39: return (limit-state)>=2? state + 1 : state
          case 37: return state>0? state - 1 : state
          default: return state
      }
    default:
      return state
  }
}

const simpleDrumNotationBuilder = (
    state = {
      index: 0,
      keyMap: keyMap(),
      notation: notate()
    },
    action) =>
{
  return {
    index: moveIndex(state.index,action,state.notation.length),
    keymap: keyMap(state.keyMap,action),
    notation: iterate(state.notation,action,state.index)
  }
}

export default simpleDrumNotationBuilder