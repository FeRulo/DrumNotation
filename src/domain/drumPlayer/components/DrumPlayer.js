import React,{ Component } from 'react';
import audioKick from '../../../assets/Kick.wav'
import audioSnare from '../../../assets/Snare.wav'

const fractions=(b,a=0)=>{ return a>b? []:[a/b,...fractions(b,a+1)]} 

const intervals = [...fractions(6),...fractions(8)]
    .sort((a,b)=>{return a-b})
    .filter((x,i,array)=>{return i===array.indexOf(x)})
    
const interval = (i)=> intervals[Math.log2(i)]

const getTimeBetween = (i0,i1,bpm)=> {
    return (60000/bpm)*(interval(i1)-interval(i0))
}

const followWith =(
        index,
        notation)=>{
    if(bitsAreMatching(notation[0].snare, index) ||
        bitsAreMatching(notation[0].kick<<12, index)){
        return index
    }
    else{
        if(Math.log2(index) > intervals.length - 1){
            return 1<<(intervals.length - 1)
        }else{
            return followWith(index<<1,
                notation)
        }
    }
}

function hit(url){
    return (new Audio(url)).play()
}

function bitsAreMatching(drum, index){
    return drum & index
}

function play(player,store,notation){
    if(bitsAreMatching(notation[0].snare,player.index)) hit(audioSnare)
    if(bitsAreMatching(notation[0].kick,player.index)) hit(audioKick)
    let nextIndex = followWith(player.index<<1,notation)
    if(nextIndex===player.index){
        stop(store)
    }
    else{
        let intervalTime = getTimeBetween(player.index, nextIndex, player.bpm)
        console.log('time waiting '+ intervalTime*player.bpm/60000)
        pause(store)
        return setTimeout(()=>follow(
        store,nextIndex), 
        intervalTime)
    }
    
}

function start(player,store, notation){
    return player.played && player.continued? play(player,store,notation):0
}
function stop(store){
    store.dispatch({
        type:'SET_PLAYED'
    })
}
function follow(store,nextIndex){
    store.dispatch({
        type:'CONTINUE',
        index: nextIndex
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
    componentDidUpdate(){
        start(this.props.player,this.props.store,this.props.notation)
    }
    render(){
        return(<p>{this.props.player.index} bpm {this.props.player.bpm}</p>)
    }

}

export default DrumPlayer;
