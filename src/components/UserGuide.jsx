import React from 'react'

const UserGuide = ({text, setRunTour}) => {
  const startTour = () => {
    setRunTour(true);
  }
  return (
       <button onClick={startTour}  className='flex gap-2 items-center border border-yellow-400 bg-yellow-50 w-fit rounded-md px-4 py-1 mt-4 sm:mt-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition group step-last'>
        <div className='h-2 w-2 bg-yellow-500 border border-yellow-700 rounded-full'></div>
        <p className='font-medium text-yellow-900 font-patrick'>{text}</p>
        <i className="fa-solid fa-arrow-right text-yellow-700 group-hover:translate-x-1 transition duration-75"></i>
      </button>
  )
}

export default UserGuide
