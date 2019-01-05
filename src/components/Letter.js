import React from 'react'
import {l,center,up,right,left,down} from '../vos/constantValues'

const orderWithFusas=(side)=>{
    if(side.length>0){
        let head = side[0]
        return ( 
            [...[
            <Line p0={center} p1={head.p0} key={`central:${head.p0.s}`}/>,
            <Curve {...head} key={`curve:${head.p0.s}`}/>,
            <Line {...head} key={`shallow:${head.p0.s}`}/>
            ],...orderWithFusas(side.slice(1))]
        )
    }
    else 
        return []
}

const orderWithSemiQuaver=(side)=>{
    if(side.length>1){
        let head = side[0]
        let second = side[1]
        return ( 
            [...[
            <Line p0={center} p1={head.p0} key={`central:${head.p0.s}`}/>,
            <Curve {...head} key={`curve:${head.p0.s}`}/>,
            {},
            <Line p0={head.p0} p1={second.p1} key={`shallow:${head.p0.s}`}/>,
            <Curve {...second} key={`curve:${second.p0.s}`}/>,
            {}
        ],...orderWithSemiQuaver(side.slice(2))]
        )
    }else if(side.length>0){
        let head = side[0]
        return ( 
            [
            <Line p0={center} p1={head.p0} key={`central:${head.p0.s}`}/>,
            <Curve {...head} key={`curve:${head.p0.s}`}/>,
            {}]
        )
    }
    else return []
}

const selectOnlyShowables=(tempo,lines)=>{
    if(lines.length>0){
        if (tempo%2!==0){
            return [lines[0],...selectOnlyShowables(tempo>>1,lines.slice(1))]
        }
        else return selectOnlyShowables(tempo>>1,lines.slice(1))
    }
    else 
        return []
}

const selectOrder=(tempo, side)=>{
    //2340 when position 2,5,8,11 is 1 (there are fusas)
    if((tempo & 2340) !==0) return orderWithFusas(side) 
    else return orderWithSemiQuaver(side)
}

const Curve = ({
    p0,
    p1,
    c
})=>{
    return(
        <path
            d= {`M${p0.s} C${p0.s} ${c} ${p1.s}`}
            stroke="black" fill="none" strokeWidth={l/35}/>
    )
}

const Line = ({
    p0,
    p1,
})=>{
    return(
        <path 
            d= {`M${p0.s} L${p0.s} ${p1.s} z`}
            stroke="black" fill="none" strokeWidth={l/35}/>
    )
}

const Letter = ({
    notation
})=>{ 
    return(
        <div style={{display:'inline-block'}}>
            <svg height={l} width={l} >
                {selectOnlyShowables(notation.snare1,selectOrder(notation.snare1,up))}
                {selectOnlyShowables(notation.snare2,selectOrder(notation.snare2,right))}
                {selectOnlyShowables(notation.kick0>>1,selectOrder(notation.kick0,left).slice(1))}
                {selectOnlyShowables(notation.kick1,selectOrder(notation.kick1,down))}
            </svg>
            <span style={{display:'block'}} width={l}>{notation.snare1.toString(2).split("").reverse().join("")}</span>
            <span style={{display:'block'}} width={l}>{notation.snare2.toString(2).split("").reverse().join("")}</span>
            <span style={{display:'block'}} width={l}>{notation.kick0.toString(2).split("").reverse().join("")}</span>
            <span style={{display:'block'}} width={l}>{notation.kick1.toString(2).split("").reverse().join("")}</span>
        </div>
    )
}

export default Letter;