import React from 'react';
const l = 90
const dx= 6, dy = 6

const points = [...Array(dy).keys()].slice(1).map(i=> 
    [...Array(dy).keys()].slice(1).map(j=>{
        return {
            x: l*j/dx,
            y: l*i/dy,
            s: `${l*j/dx} ${l*i/dy}`
        }
        }))

const center = points[(dx/2)-1][(dy/2)-1]

const upperPerimeter = 
    [...points[0].map(p=>{return {...p,c:`${p.x+l/dx/2} ${p.y-2*l/dy}`}}),
    ...points.slice(1).map(row=>row[dx-2]).map(p=>{return {...p,c:`${p.x+2*l/dy} ${p.y+l/dx/2}`}})]

const lowerPerimeter = 
    [...points.map(row=>row[0]).map(p=>{return {...p,c:`${p.x-2*l/dy} ${p.y-l/dx/2}`}}),
    ...points[dy-2].map(p=>{return {...p,c:`${p.x+l/dx/2} ${p.y-2*l/dy}`}})]

const lines =  [...upperPerimeter,...lowerPerimeter]
    .map(point=>{
        return {
            p0:center,
            p1:point
        }
    })

const glue=(rest)=>{
    if(rest.length>1){
        let point = rest[0]
        return [{
            p0:point,
            p1:rest[1]},...glue(rest.slice(1))]
        }
    else 
        return []
}

const Curve = ({
    p0,
    p1,
})=>{
    return(
        <path
            d= {`M${p0.s} C${p0.s} ${p0.c} ${p1.s}`}
            stroke="black" fill="none"/>
    )
}

const Line = ({
    p0,
    p1
})=>{
    return(
        <path
            d= {`M${p0.s} L${p0.s} ${p1.s} z`}
            stroke="black" fill="none"/>
    )
}

const Letter = ({
    simpleDrumNotationBuilder
})=>{
    return(
    <svg height={l} width={l}>
        <rect height={l} width={l} fill="transparent" stroke="black"/>
        {lines.map(l=>{
            return <Line {...l}/>
        })}
        {glue(upperPerimeter).map(l=>{
            return <Line {...l}/>
        })}
        {glue(lowerPerimeter).map(l=>{
            return <Line {...l}/>
        })}
        {glue(upperPerimeter).map(c=>{
            return <Curve {...c}/>
        })}
        {glue(lowerPerimeter).map(c=>{
            return <Curve {...c}/>
        })}
    </svg>
    )
}

export default Letter;