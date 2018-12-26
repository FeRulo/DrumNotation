import notate from './notate'

const iterate = (state = [0], action={type:'NONE'}, index = 0) =>{
  switch (action.type) {
    case 'KEYDOWN': 
      switch(action.keyCode){
        case 32: return [...state.slice(0,index),0,...state.slice(index)]
        case 8: return [...state.slice(0,index),...state.slice(index+1)]
        case 46: return [...state.slice(0,index),...state.slice(index+1)]
        default: {
          switch (action.keyMap.map(k=>k.key).toString()){
            case 'i' : return [...state.slice(0,index),...notate(state.slice(index),action)]
            case 'j' : return [...state.slice(0,index),...notate(state.slice(index),action)]
            case 'k' : return [...state.slice(0,index),...notate(state.slice(index),action)]
            case 'l' : return [...state.slice(0,index),...notate(state.slice(index),action)]
          }
        }
      }
    default:
      return state
  }
}

const moveIndex = (state = 0, action={type:'NONE'},limit = 1) =>{
  switch (action.type) {
    case 'KEYDOWN':
      switch(action.keyCode){
          case 37: return (limit-state)>=2? state + 1 : state
          case 39: return state>0? state - 1 : state
          case 8: return state==limit-1 && state > 0? state - 1: state
          case 46: return state>0? state - 1 : state
          default: return state
      }
    default:
      return state
  }
}

const simpleDrumNotationBuilder = (
    state = {
      index: 0,
      notation: notate()
    },
    action) =>
{
  return {
    index: moveIndex(state.index,action,state.notation.length),
    notation: iterate(state.notation,action,state.index)
  }
}

export default simpleDrumNotationBuilder