export function stop(store){
    store.dispatch({
        type:'SET_PLAYED'
    })
}

export function follow(store,nextIndexes){
    store.dispatch({
        type:'CONTINUE',
        index: nextIndexes.indexHit,
        indexLetter: nextIndexes.indexLetter
    })
}

export function pause(store){
    store.dispatch({
        type:'PAUSE'
    })
}