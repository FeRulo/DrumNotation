const tempoBin =(key)=>{
  switch (key) {
    case "a":return Math.pow(2,0)
    case "s":return Math.pow(2,3)
    case "d":return Math.pow(2,6)
    case "f":return Math.pow(2,9)
    case "q":return Math.pow(2,1)
    case "w":return Math.pow(2,4)
    case "e":return Math.pow(2,7)
    case "r":return Math.pow(2,10)
    case "z":return Math.pow(2,2)
    case "x":return Math.pow(2,5)
    case "c":return Math.pow(2,8)
    case "v":return Math.pow(2,11)
    case "g":return Math.pow(2,12)
    default:
      return 0
  }
}

const notate = (state = [{
  snare1: 0,
  snare2: 0,
  kick0: 0,
  kick1: 0
}], action={type:'NONE'}) =>{
  switch (action.type) {
    case 'KEYDOWN': 
      switch (action.keyMap.map(k=>k.key).toString()){
        case 'i' : return [
            {...state[0],snare1:state[0].snare1 ^ tempoBin(action.key)}, 
            ...state.slice(1)]
        case 'j' : return [
            {...state[0],kick0:state[0].kick0 ^ tempoBin(action.key)}, 
            ...state.slice(1)]
        case 'k' : return [
            {...state[0],kick1:state[0].kick1 ^ tempoBin(action.key)}, 
            ...state.slice(1)]
        case 'l' : return [
            {...state[0],snare2:state[0].snare2 ^ tempoBin(action.key)}, 
            ...state.slice(1)]
      }
    default:
      return state
  }
  
}

export default notate