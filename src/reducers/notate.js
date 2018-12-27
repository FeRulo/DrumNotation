const tempoBin =(keyMap=[], combinations, bits)=>{
  if(combinations.length>0 && keyMap.length>0){
    return ( combinations[0].every(k=>contains(keyMap,k)) && 
            combinations[0].length===keyMap.length? 
            bits[0]: 0 ) 
    + tempoBin(keyMap,combinations.slice(1),bits.slice(1))
  } 
  else return 0
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

function contains(array, element){
  return array.flat().filter((k,i,self)=>self.indexOf(k)===i).includes(element)
}

const bits = [...Array(13).keys()].map(k=>Math.pow(2,k))
const keySpecials = [['a'],['s'],[],['d'],['f']]
const keyPoints = [['7','8','9'],['4','5','6'],['1','2','3']]
const snare1 = orderWithBites(keyPoints[0],keyPoints[1][1])
const snare2 = orderWithBites(keyPoints.map(row=>row[2]),keyPoints[1][1])
const kick0 = orderWithBites(keyPoints.map(row=>row[0]),keyPoints[1][1])
const kick1 = orderWithBites(keyPoints[2],keyPoints[1][1]).concat([[keyPoints[2][2],keyPoints[1][1]]])

const notate = (state = [{
  snare1: 0,
  snare2: 0,
  kick0: 0,
  kick1: 0
}], action={type:'NONE',keyMap:[]}) =>{
  let keys = [action.key,...action.keyMap.map(k=>k.key)].filter((k,i,self)=>self.indexOf(k)===i)
  let s = (state[0].kick1 ^ tempoBin(keys,kick1,bits)).toString(2)
  return [
      {...state[0],
        snare1: state[0].snare1 ^ tempoBin(keys,snare1,bits),
        snare2: state[0].snare2 ^ tempoBin(keys,snare2,bits),
        kick0: state[0].kick0 ^ tempoBin(keys,kick0,bits),
        kick1: state[0].kick1 ^ tempoBin(keys,kick1,bits),
      }, 
      ...state.slice(1)]
}

export default notate