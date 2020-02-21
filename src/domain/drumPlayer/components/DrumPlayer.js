import React,{ Component } from 'react';
import Player from './Player'

class DrumPlayer extends Component {
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
    componentDidUpdate(){
        Player.start(this.props.player,this.props.store,this.props.notation)
    }
    render(){
        return(<p>{Math.log2(this.props.player.index)} bpm {this.props.player.bpm}</p>)
    }

}

export default DrumPlayer;
