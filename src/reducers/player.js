const player = (state={
        played: false,
        continued:false,
        index: 0,
    }, action={type:'NONE'}) => {
    switch (action.type) {
        case 'SET_PLAYED':
            return {played: !state.played, 
                    continued: true,
                    index: 0}
        case 'PAUSE':
            return {continued: false, 
                    index: state.index,
                    played: state.played}
        case 'CONTINUE':
            return {continued: true, 
                    index: state.played? state.index + 1 : 0,
                    played: state.played}
        default: return state
  }
}

export default player
