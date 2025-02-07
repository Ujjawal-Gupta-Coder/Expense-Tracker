import React from 'react'
import { NavLink } from 'react-router-dom';
const Navpanel = ({navpanel, setNavpanel}) => {
    const ShowCloseNavPanel = () => {
        setNavpanel(!navpanel);
      }
  return (
    <div className='fixed md:hidden top-[70px] w-full h-full z-10'>
     <ul className='text-2xl bg-slate-800 pt-12 w-full h-full flex flex-col items-center gap-y-10  text-white'>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/' onClick={ShowCloseNavPanel}>Home</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/history' onClick={ShowCloseNavPanel}>History</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/analysis' onClick={ShowCloseNavPanel}>Analysis</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/about' onClick={ShowCloseNavPanel}>About</NavLink></li>
          <div className='h-[1px] bg-white w-[80%]'></div>
          <button className='border-2 border-red-600 px-4 py-2 w-40 text-xl font-patrick font-bold rounded-lg bg-gradient-to-tr from-purple-700 to-slate-600 hover:from-purple-900 hover:to-slate-900 hover:-translate-y-2 transition'>Sign In</button>
    </ul>
    </div>

  )
}

export default Navpanel
