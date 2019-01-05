import React from 'react'
import Sound from 'react-sound'

const Music =({url})=>{
    return <Sound
    url={url}
    playStatus={Sound.status.PLAYING}
    playFromPosition={300 /* in milliseconds */}
    muted={true}
    />
}
  
  
  export default Music;