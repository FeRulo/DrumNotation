import React,{ Component } from 'react';
import audioKick from '../../../assets/Kick.wav'
import audioSnare from '../../../assets/Snare.wav'
import {pause, stop, follow} from '../dispatchers/playerDispatcher'

const fractions=(b,a=0)=>{ return a>b? []:[a/b,...fractions(b,a+1)]} 

const intervals = [...fractions(6),...fractions(8)]
    .flatMap(d=>[d,d+1])
    .sort((a,b)=>{return a-b})
    .filter((x,i,array)=>{return i===array.indexOf(x)})//no repeated elements

console.log(intervals)

const interval = (i)=> intervals[Math.log2(i)]

const getTimeBetween = (player,next,bpm)=> {  
    console.log(`${interval(next.indexHit)}-${interval(player.index) }+${next.indexLetter - player.indexLetter}`)  
    return (60000/bpm)*(
        interval(next.indexHit)-
        (next.indexHit===1? 0:interval(player.index)) +
        next.indexLetter - player.indexLetter)
}
function getKickLetter(indexLetter, indexHit,notation){
    return (indexHit >= (1<<12) && indexLetter < notation.length - 1)? 
        (indexLetter + 1):
         indexLetter
}
function getKickHit(indexHit){
    return (indexHit >= (1<<12))? indexHit>>12: indexHit<<12
}
const getNextIndexes =(
        indexHit,
        indexLetter,
        notation)=>{
    let kickLetter = getKickLetter(indexLetter,indexHit,notation)
    let kickHit = getKickHit(indexHit)
    if(indexLetter >= notation.length) return {indexHit:indexHit,indexLetter:indexLetter}
    else if(bitsAreMatching(notation[indexLetter].snare, indexHit) ||
        bitsAreMatching(notation[kickLetter].kick, kickHit)){
        return {indexHit:indexHit,indexLetter:indexLetter}
    }
    else{
        if(indexHit >= (1<<24)) return getNextIndexes(1, indexLetter + 1, notation)
        else return getNextIndexes(indexHit<<1, indexLetter, notation)
    }
}

function hit(url){
    return (new Audio(url)).play()
}

function bitsAreMatching(drum, index){
    let res = drum & index
    return res
}
function playKick(notation,indexLetter, indexHit){
    let kickLetter = getKickLetter(indexLetter,indexHit,notation)
    let kickHit = getKickHit(indexHit)
    if(bitsAreMatching(notation[kickLetter].kick,kickHit)) {
        return hit(audioKick)
    }
}

function playSnare(notation,indexLetter, indexHit){
    if(bitsAreMatching(notation[indexLetter].snare,indexHit)) hit(audioSnare)
}

function play(player,store,notation){
    if(player.indexLetter >= notation.length) stop(store)    
    else{
        console.log(`***hit: ${player.index.toString(2)} letter: ${player.indexLetter} 
            notation: ${notation[player.indexLetter].snare}`)
        playKick(notation,player.indexLetter,player.index)
        playSnare(notation,player.indexLetter,player.index)
        let nextIndexes = getNextIndexes(player.index<<1, player.indexLetter, notation)
        let intervalTime = getTimeBetween(player, nextIndexes, player.bpm)
        console.log('time waiting '+ intervalTime*player.bpm/60000)
        pause(store)
        return setTimeout(()=>follow(
            store,nextIndexes), 
        intervalTime)
    }
    
}

function start(player,store, notation){
    return player.played && player.continued? play(player,store,notation.slice().reverse()):0
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
