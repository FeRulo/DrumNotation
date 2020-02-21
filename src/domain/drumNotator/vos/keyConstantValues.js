export function contains(array, element){
    return array.flat().filter((k,i,self)=>self.indexOf(k)===i).includes(element)
}
const orderKeyCombinationsWithPoints= (row, center, keySpecials, bits)=>{
    if (row.length > 1){
        return [
        {keys:[row[0],center], binaryValue:bits[0]},
        ...keySpecials.map((k,i)=>{
            return {keys:[row[0],row[1],...k],binaryValue:bits[i+1]}
        }),
        ...orderKeyCombinationsWithPoints(row.slice(1),center,keySpecials,bits.slice(6))
        ]
    }
    else return []
}
const bits = [...Array(25).keys()].map(k=>Math.pow(2,k))
const keySpecials = [['z'],['x'],[],['c'],['v']]
const keyPoints = [['7','8','9'],['4','5','6'],['1','2','3']]

export const snareKeyCombination = orderKeyCombinationsWithPoints(
    [...keyPoints[0],...keyPoints.slice(1).map(row=>row[2])],
    keyPoints[1][1],
    keySpecials,
    bits)

export const kickKeyCombination = orderKeyCombinationsWithPoints(
    [...keyPoints.map(row=>row[0]),...keyPoints[2].slice(1)].reverse(),
    keyPoints[1][1],
    keySpecials.reverse(),
    bits.reverse())
console.log(kickKeyCombination)
    