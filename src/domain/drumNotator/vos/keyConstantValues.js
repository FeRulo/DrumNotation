export function contains(array, element){
    return array.flat().filter((k,i,self)=>self.indexOf(k)===i).includes(element)
}
const orderWithBites= (row, center)=>{
    if (row.length > 1){
        return [
        [row[0],center],
        ...keySpecials.map(k=>[row[0],row[1],...k]),
        ...orderWithBites(row.slice(1),center)
        ]
    }
    else return []
}
export const bits = [...Array(13).keys()].map(k=>Math.pow(2,k))
const keySpecials = [['z'],['c'],[],['x'],['v']]
const keyPoints = [['i','o','p'],['k','l','ñ'],[',','.','-']]
export const snare1KeyCombination = orderWithBites(keyPoints[0],keyPoints[1][1])
export const snare2KeyCombination = orderWithBites(keyPoints.map(row=>row[2]),keyPoints[1][1])
export const kick0KeyCombination = orderWithBites(keyPoints.map(row=>row[0]),keyPoints[1][1])
export const kick1KeyCombination = orderWithBites(keyPoints[2],keyPoints[1][1]).concat([[keyPoints[2][2],keyPoints[1][1]]])