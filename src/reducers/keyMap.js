const keyMap = (state = [], action={type:'NONE'}) =>{
  switch (action.type) {
    case 'KEYDOWN':
      if( !state.map(s=>s.key).includes(action.key)){
        return [...state,{
          key: action.key,
          keyCode: action.keyCode
        }]
      }else{
        return state
      }
    case 'KEYUP':
      return state.filter(s=>s.key!== action.key)
    default:
      return state
  }
}

export default keyMap