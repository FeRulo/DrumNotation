const moveIndex = (state = 0, action={type:'NONE'},limit = 1) =>{
    switch (action.type) {
        case 'KEYDOWN':
        switch(action.keyCode){
            case 37: return (limit-state)>=2? state + 1 : state //left
            case 8: return state==limit-1 && state > 0? state - 1: state//backspace
            case 39: //right
            case 46: return state>0? state - 1 : state//supr
            default: return state
        }
        default:
        return state
    }
}

export default moveIndex