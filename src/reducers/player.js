import audioKick from '../assets/Kick.wav'
// import audioSnare from '../assets/Snare.wav'
// import sound from '../assets/sound.wav'
// import audioHiHats from '../assets/HiHats.wav'

function hit(url){
    return (new Audio(url)).play()
}

function play(time=0){
    return setTimeout(()=>hit(audioKick),time)
}

const player = (state={
        played: false,
        indexPlayer: 0,
        playing: 0,
    }, action={type:'NONE'}) => {
    switch (action.type) {
        case 'SET_PLAYED':
               
            let promise = state.played?
                0: player(state.delay)
            return {played: !state.played, 
                    indexPlayer: state.indexPlayer,
                    playing: promise}
        default: return state
  }
}

export default player
