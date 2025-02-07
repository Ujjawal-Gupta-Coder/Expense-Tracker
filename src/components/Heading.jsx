import React from 'react'

const Heading = ({headline}) => {
  return (
    <div className='text-5xl md:text-6xl lg:text-7xl text-center font-bold bg-clip-text flex flex-col flex-wrap items-center text-transparent bg-gradient-to-r from-rose-500 from-30% via-orange-400 via-40% to-green-400 group'>
      
      {headline}
      
      <div className='h-[2px] bg-gradient-to-r from-rose-500 from-30% via-orange-400 via-40% to-green-400 mt-4 w-[60%] group-hover:w-[80%] text-center group-hover:from-green-600 group-hover:via-sky-500 group-hover:to-purple-500'></div>
      
    </div>
  )
}

export default Heading
