import React, { useContext } from 'react'
import logoImg from '../assets/rupee.gif'
import { NavLink } from 'react-router-dom';
import { showPopUpFormContext } from '../contexts/showPopUpFormContext';
const Navbar = ({navpanel, setNavpanel}) => {
  const [showPopUpForm, setShowPopUpForm] = useContext(showPopUpFormContext);
  const ShowCloseNavPanel = () => {
    setNavpanel(!navpanel);
    setShowPopUpForm(false);
  }
  return (
    <div className='fixed z-50 top-0 w-full h-[70px] bg-slate-900 text-white flex items-center justify-between py-2 px-6'>
        <button className='flex items-center group'>
          <img src={logoImg} alt="Logo" className='h-12 w-12 rounded-full'/>
            <div>
                <div className='text-2xl font-patrick bg-clip-text text-white group-hover:text-transparent bg-gradient-to-r from-pink-400 via-orange-400 to-sky-400 font-bold'>ExpenceTraker</div>  
                <div className='h-[2px] bg-transparent rounded-xl group-hover:bg-gradient-to-l from-pink-400 via-orange-400 to-sky-400'></div>
            </div>
        </button>
        
      <div className='hidden md:flex items-center gap-12'>
        <ul className='flex text-lg items-center gap-6'>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/' >Home</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/history' >History</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/analysis'>Analysis</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/about' >About</NavLink></li>
      </ul>

      <button className='border-2 border-red-600 px-6 py-1 text-xl font-patrick font-bold rounded-lg bg-gradient-to-tr from-purple-500 to-slate-500 hover:from-purple-800 hover:to-slate-800'>Sign In</button>
      </div>
      

      {
        navpanel ? 
        <i className="fa-solid fa-xmark md:hidden text-2xl cursor-pointer hover:border-2 border-white rounded-md px-1 hover:bg-slate-400 hover:text-black" onClick={ShowCloseNavPanel}></i>
        : 
        <i className="fa-solid fa-bars md:hidden text-2xl cursor-pointer hover:border-2 border-white rounded-md px-1 hover:bg-slate-400 hover:text-black" onClick={ShowCloseNavPanel}></i>
      }

    </div> 
  )
}

export default Navbar
