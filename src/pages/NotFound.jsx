import React from 'react'
import video from '../assets/notFoundAsset.mp4'
const NotFound = () => {
  return (
    <div className='flex justify-center min-h-screen--100px'>
      <video src={video} autoPlay loop muted className='h-[400px] w-[400px] md:h-[600px] md:w-[600px]'></video>
    </div>
  )
}

export default NotFound
