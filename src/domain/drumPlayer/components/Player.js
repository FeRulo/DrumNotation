import audioKick from '../../../assets/Kick.wav'
import audioSnare from '../../../assets/Snare.wav'
import {pause, stop, follow} from '../dispatchers/playerDispatcher'


class Player {    
    static fractions = (b,a)=>{ 
        return a>b? []:[a/b,...Player.fractions(b,a+1)]} 

    static intervals = [...Player.fractions(6,0),...Player.fractions(8,0)]
        .flatMap(d=>[d,d+1])
        .sort((a,b)=>{return a-b})
        .filter((x,i,array)=>{return i===array.indexOf(x)})//no repeated elements

    static interval = (i)=> Player.intervals[Math.log2(i)]

    static getTimeBetween = (player,next,bpm)=> {  
        return (60000/bpm)*(
            Math.abs(Player.interval(next.indexHit)-Player.interval(player.index) +
            2*(next.indexLetter - player.indexLetter)) 
            )
    }
    static isBeginning(snareIndex){
        return snareIndex <= (1<<12) 
    }

    static isFinished(indexLetter,notation){
        return (indexLetter < notation.length - 1)
    }

    static advanceTheHalf(indexHit){
        return indexHit << 12
    }

    static delayTheHalf(indexHit){
        return indexHit>>12
    }

    static getKickIndexes(indexLetter,indexHit,notation){
        return (Player.isBeginning(indexHit) || !Player.isFinished(indexLetter,notation))? 
            {indexHit: Player.advanceTheHalf(indexHit),indexLetter:indexLetter}:
            {indexHit: Player.delayTheHalf(indexHit),indexLetter:(indexLetter + 1)}
    }

    static isFinalHit(indexHit){
        return indexHit >= (1<<23)
    }

    static getNextIndexes =(
            snareHit,
            indexLetter,
            notation)=>{
        let indexHit = snareHit === 0? 1: snareHit << 1 
        let kickIndexes = Player.getKickIndexes(indexLetter,indexHit,notation)
        if (Player.isFinalHit(snareHit)) return Player.getNextIndexes(0, indexLetter + 1, notation)
        else if(indexLetter >= notation.length) return {indexHit:indexHit,indexLetter:indexLetter}
        else if(Player.bitsAreMatching(notation[indexLetter].snare, indexHit) ||
            Player.bitsAreMatching(notation[kickIndexes.indexLetter].kick,kickIndexes.indexHit)){
            return {indexHit:indexHit,indexLetter:indexLetter}
        }
        else{
            if(Player.isFinalHit(indexHit)) {
                return Player.getNextIndexes(0, indexLetter + 1, notation)
            }
            else {
                return Player.getNextIndexes(indexHit, indexLetter, notation)}
        }
    }

    static hit(url){
        return (new Audio(url)).play()
    }

    static bitsAreMatching(drum, index){
        let res = drum & index
        return res
    }

    static playKick(notation,indexLetter, indexHit){
        let kickIndexes = Player.getKickIndexes(indexLetter,indexHit,notation)
        if(Player.bitsAreMatching(notation[kickIndexes.indexLetter].kick,kickIndexes.indexHit)) {
            return Player.hit(audioKick)
        }
    }

    static playSnare(notation,indexLetter, indexHit){
        if(Player.bitsAreMatching(notation[indexLetter].snare,indexHit)) Player.hit(audioSnare)
    }

    static play(player,store,notation){
        if(player.indexLetter >= notation.length) stop(store)    
        else{
            Player.playKick(notation,player.indexLetter,player.index)
            Player.playSnare(notation,player.indexLetter,player.index)
            let nextIndexes = Player.getNextIndexes(player.index, player.indexLetter, notation)
            let intervalTime = Player.getTimeBetween(player, nextIndexes, player.bpm)
            pause(store)
            return setTimeout(()=>follow(store,nextIndexes), intervalTime)
        }
        
    }

    static start(player,store, notation){
        return player.played && player.continued? Player.play(player,store,notation.slice().reverse()):0
    }
}

export default Player