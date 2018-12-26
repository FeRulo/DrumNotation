import React from 'react'
import {l,center,up,right,left,down} from '../vos/constantValues'

const orderLineTypes=(side)=>{
    if(side.length>0){
        let head = side[0]
        return ( 
            [...[
            <Line p0={center} p1={head.p0} key={`central:${head.p0.s}`}/>,
            <Curve {...head} key={`curve:${head.p0.s}`}/>,
            <Line {...head} key={`shallow:${head.p0.s}`}/>
            ],...orderLineTypes(side.slice(1))]
        )
    }
    else 
        return []
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
const Letter = ({
    tempo
})=>{ 
    return(
    <svg height={l} width={l}>
        <rect height={l} width={l} fill="transparent" stroke="black"/>
        {selectOnlyShowables(tempo,orderLineTypes(up))}
    </svg>
    )
}

export default Letter;