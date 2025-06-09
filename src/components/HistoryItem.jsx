import React from 'react'
const HistoryItem = ({category, discription, amount, mode, date,id, setContextMenuPosition}) => {
  
   const handleContextMenu = (dets) => {
    dets.preventDefault();
    setContextMenuPosition({
      toShow : true,
      xPos : dets.pageX,
      yPos : dets.pageY,
      id : dets.currentTarget.id,
    })
  }

  const childElemntContextMenu = (dets) => {
    dets.preventDefault();      
  }
  return (
    <> 
    <div onContextMenu={handleContextMenu} id={id} className='group w-[90%] max-w-[40rem] h-auto flex justify-between items-center border-[3px] border-yellow-600 rounded-xl py-3 px-3 bg-gradient-to-r from-sky-500 via-blue-600 to-purple-500 cursor-pointer hover:bg-blue-500 step-7'>
      <div className='px-2 flex flex-col items-start justify-start' onContextMenu={childElemntContextMenu}>
        <h2 className='text-4xl text-white font-patrick md:mb-2'>{category}</h2>
        <p className='text-gray-300 text-balance text-sm'>{discription}</p>

        <div className='flex xs:gap-2 xs:flex-row flex-col' >
          <div className='border-2 border-red-600 w-fit h-fit px-2 rounded-md bg-purple-800 group-hover:bg-purple-400 mt-2 text-white font-bold font-patrick text-[12px] md:text-[16px]'>{mode}</div>
          <div className='border-2 border-red-600 w-fit h-fit px-2 rounded-md bg-purple-800 group-hover:bg-purple-400 mt-2 text-white font-bold font-patrick text-[12px] md:text-[16px]'>{date}</div>
        </div>
        
      </div>
     <div className='rounded-full text-center flex text-white border-2 px-5 py-3 border-green-700 w-[105px] h-[105px] flex-col items-center text-lg bg-green-300/40 group-hover:bg-green-400'> ₹ <div className='font-extrabold'>{amount}</div></div>
    </div>
    
    </>
    
  )
}

export default HistoryItem
