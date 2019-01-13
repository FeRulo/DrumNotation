import React from 'react'
import {letterCenter,
    letterUpperSide,
    letterRightSide,
    letterLeftSide,
    letterDownSide,l} from '../vos/constantValues'

const orderWithFusas=(side)=>{
    if(side.length>0){
        let head = side[0]
        return ( 
            [...[
            <Line p0={letterCenter} p1={head.p0} key={`central:${head.p0.s}`}/>,
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
            <Line p0={letterCenter} p1={head.p0} key={`central:${head.p0.s}`}/>,
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
            <Line p0={letterCenter} p1={head.p0} key={`central:${head.p0.s}`}/>,
            <Curve {...head} key={`curve:${head.p0.s}`}/>,
            {}]
        )
    }
    else return []
}

const selectOnlyShowables=(binaryValue,lines)=>{ 
    if(lines.length>0){
        if (binaryValue%2!==0){
            return [lines[0],...selectOnlyShowables(binaryValue>>1,lines.slice(1))]
        }
        else return selectOnlyShowables(binaryValue>>1,lines.slice(1))
    }
    else 
        return []
}
const areFusasPositions=(binaryValue)=>{
    return (binaryValue & 9586980) !== 0
}
const selectOrder=(binaryValue, side)=>{
    if(areFusasPositions(binaryValue)) return orderWithFusas(side) 
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
                {selectOnlyShowables(
                    notation.snare,
                    selectOrder(notation.snare,[...letterUpperSide,...letterRightSide]))}
                {selectOnlyShowables(
                    notation.kick,
                    selectOrder(notation.kick,[...letterLeftSide,...letterDownSide]))}
            </svg>
            <span style={{display:'block'}} width={l}>{notation.snare.toString(2).split("").reverse().join("")}</span>
            <span style={{display:'block'}} width={l}>{notation.kick.toString(2).split("").reverse().join("")}</span>
        </div>
    )
}

export default Letter;