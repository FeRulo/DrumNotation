import React,{ Component } from 'react';
import './DrumNotator.css';
import audioKick from '../assets/Kick.wav'
// import audioSnare from '../assets/Snare.wav'
// import sound from '../assets/sound.wav'
// import audioHiHats from '../assets/HiHats.wav'

function hit(url){
    return (new Audio(url)).play()
}

function play(time=0){
    return setInterval(()=>hit(audioKick),time)
}

function start(player){
    return player.played? play(500):0
}

class DrumPlayer extends Component{
    componentDidMount() {
        document.addEventListener('keydown', e=>{
            if(e.keyCode===13) {
                this.props.store.dispatch({
                    type:'SET_PLAYED',
                    notation: this.props.notation
                })
            }
        })
        
    }
    render(){
        let player = this.props.player
        start(player)
        return(<p></p>)
    }

}

export default DrumPlayer;
