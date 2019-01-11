import React,{ Component } from 'react';
import './DrumNotator.css';
import audioKick from '../assets/Kick.wav'
// import audioSnare from '../assets/Snare.wav'
// import sound from '../assets/sound.wav'
// import audioHiHats from '../assets/HiHats.wav'

function hit(url){
    return (new Audio(url)).play()
}

function play(bpm,store){
    hit(audioKick)
    pause(store)
    return setTimeout(()=>next(store),60000/bpm)
}

function start(player,store){
    return player.played && player.continued? play(90,store):0
}

function next(store){
    store.dispatch({
        type:'CONTINUE'
    })
}

function pause(store){
    store.dispatch({
        type:'PAUSE'
    })
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
        start(this.props.player,this.props.store)
        return(<p>{this.props.player.index}</p>)
    }

}

export default DrumPlayer;
