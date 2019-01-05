import React from 'react'

function togglePlay(url){
  return (new Audio(url)).play()
}

const Music = ({url}) => {
  return (
    <div>
        <button onClick={togglePlay(url)}>{'Play'}</button>
    </div>
  )
}

export default Music;