import notate from './notate'

const iterate = (state = [0], action={type:'NONE'}, index = 0) =>{
    switch (action.type) {
      case 'KEYDOWN': 
        switch(action.keyCode){
          case 13: 
          case 32: 
            return [...state.slice(0,index),...notate(),...state.slice(index)]//space
          case 8: //backspace
          case 46: //supr
            if(state.length !== 1) return [...state.slice(0,index),...state.slice(index+1)]
            else return notate()
          default: 
            return [...state.slice(0,index),...notate(state.slice(index),action)]
        }
      default:
        return state
    }
  }

  export default iterate
  