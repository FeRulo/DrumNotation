
const player = (state={
        played: false,
        continued:false,
        index: 1,
        indexLetter:0,
        bpm:60
    }, action={type:'NONE'}) => {
    switch (action.type) {
        case 'SET_PLAYED':
            return {played: !state.played, 
                    continued: true,
                    index: 1,
                    indexLetter:0,
                    bpm:state.bpm}
        case 'PAUSE':
            return {continued: false, 
                    index: state.index,
                    indexLetter:0,
                    played: state.played,
                    bpm:state.bpm}
        case 'CONTINUE':
            return {continued: true, 
                    index: state.played? action.index:1,
                    indexLetter: state.played? action.indexLetter:0,
                    played: state.played,
                    bpm:state.bpm}
        case 'INCREASE_BPM':
            return {continued: state.continued, 
                    index: state.index,
                    played: state.played,
                    bpm:state.bpm + 1}
        case 'DECREASE_BPM':
            return {continued: state.continued, 
                    index: state.index,
                    indexLetter:0,
                    played: state.played,
                    bpm:state.bpm - 1}
        default: return state
  }
}

export default player
