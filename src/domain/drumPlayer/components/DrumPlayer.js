import React,{ Component } from 'react';
import audioKick from '../../../assets/Kick.wav'

function hit(url){
    return (new Audio(url)).play()
}

function play(bpm,store){
    hit(audioKick)
    pause(store)
    return setTimeout(()=>next(store),60000/bpm)
}

function start(player,store){
    return player.played && player.continued? play(player.bpm,store):0
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
            switch(e.keyCode) {
                case 13:
                    this.props.store.dispatch({
                        type:'SET_PLAYED'
                    }) 
                    break;
                case 38:
                    this.props.store.dispatch({
                        type:'INCREASE_BPM'
                    })
                    break;
                case 40:
                    this.props.store.dispatch({
                        type:'DECREASE_BPM'
                    })
                    break;
                default: break;
            }
        })
        
    }
    render(){
        start(this.props.player,this.props.store)
        return(<p>{this.props.player.index} bpm {this.props.player.bpm}</p>)
    }

}

export default DrumPlayer;
