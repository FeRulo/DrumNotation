export const l = 90
const dx= 6, dy = 6

export const points = [...Array(dy).keys()].slice(1).map(i=> 
    [...Array(dy).keys()].slice(1).map(j=>{
        return {
            x: l*j/dx,
            y: l*i/dy,
            s: `${l*j/dx} ${l*i/dy}`
        }
        }))

export const center = points[(dx/2)-1][(dy/2)-1]

export const up = glue(points[0])
    .map(p=>{        
        return {
            p0:p.p0,
            p1:p.p1,
            c:`${p.p0.x+l/dx/2} ${p.p0.y-2*l/dy}`}
        }) 

export const right = glue(points.map(row=>row[dx-2]))
    .map(p=>{
        return {
            p0:p.p0,
            p1:p.p1,
            c:`${p.p0.x+2*l/dx} ${p.p0.y+l/dy/2}`}
        })

export const left = glue(points.map(row=>row[0]))
    .map(p=>{
        return {
            p0:p.p0,
            p1:p.p1,
            c:`${p.p0.x-2*l/dx} ${p.p0.y+l/dy/2}`}
        })
export const down = glue([...points[dy-2],points[dy-3][dx-2]])
    .map(p=>{
        return {
            p0:p.p0,
            p1:p.p1,
            c:`${p.p0.x+l/dx/2} ${p.p0.y+2*l/dy}`}
        })

export const centralLines =    [...up,
                        ...right,
                        ...left,
                        ...down 
                        ]
    .map(point=>{
        return {
            p0:center,
            p1:point.p0
        }
    })

function glue(rest){
    if(rest.length>1){
        let point = rest[0]
        return [{
            p0:point,
            p1:rest[1]},...glue(rest.slice(1))]
        }
    else 
        return []
}