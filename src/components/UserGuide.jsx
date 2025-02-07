import React from 'react'
import { Link } from 'react-router-dom'

const UserGuide = () => {
  return (
       <Link to='/about' className='flex gap-2 items-center border border-yellow-400 bg-yellow-50 w-fit rounded-md px-4 py-1 mt-4 sm:mt-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition group'>
        <div className='h-2 w-2 bg-yellow-500 border border-yellow-700 rounded-full'></div>
        <p className='font-medium text-yellow-900 font-patrick'><span className='text-yellow-700'>v7.21.1: </span>Quick Start Guide</p>
        <i className="fa-solid fa-arrow-right text-yellow-700 group-hover:translate-x-1 transition duration-75"></i>
      </Link>
  )
}

export default UserGuide
