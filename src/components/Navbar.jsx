import React, { useState } from 'react'
import logoImg from '../assets/rupee.gif'
import { NavLink } from 'react-router-dom';
import dummyData from '../../dummyData.json'
import store from '../store';
const Navbar = ({navpanel, setNavpanel}) => {
  const {expenseData, setExpenseData, setShowPopUpForm, demoMode, toggleDemoMode} = store();
  const [btnText, setBtnText] = useState( localStorage.getItem("demoMode") === "true" ? "❌ Exit Demo Mode ❌" : "✨ Try Demo: Fill with Sample Data ✨");
  const ShowCloseNavPanel = () => {
    setNavpanel(!navpanel);
    setShowPopUpForm(false);
  }

  const handleFillDummyData = () => {
      if(demoMode) {

        localStorage.setItem("expenseData", localStorage.getItem("backupData"))
        setExpenseData(localStorage.getItem("backupData") ? JSON.parse(localStorage.getItem("backupData")) : []);

        setBtnText("✨ Try Demo: Fill with Sample Data ✨")
      }
      else {
        localStorage.setItem("backupData", JSON.stringify(expenseData))

        localStorage.setItem("expenseData", JSON.stringify(dummyData))
        setExpenseData(dummyData);

        setBtnText("❌ Exit Demo Mode ❌")
      }
      toggleDemoMode()
  }

  return (
    <div className='fixed z-50 top-0 w-full h-[70px] bg-slate-900 text-white flex items-center justify-between py-2 px-6'>
      <button className='flex items-center group'>
          <img src={logoImg} alt="Logo" className='h-12 w-12 rounded-full'/>
            <div>
                <div className='text-2xl font-patrick bg-clip-text text-white group-hover:text-transparent bg-gradient-to-r from-pink-400 via-orange-400 to-sky-400 font-bold'>ExpenceTracker</div>  
                <div className='h-[2px] bg-transparent rounded-xl group-hover:bg-gradient-to-l from-pink-400 via-orange-400 to-sky-400'></div>
            </div>
      </button>
        
      <button className='hidden md:flex ml-0 md:ml-2 text-center border-1 border-sky-600 px-4 py-1 font-patrick rounded-lg bg-gradient-to-tr from-purple-200 to-slate-300 hover:from-purple-500 text-black hover:to-slate-800 hover:text-white' onClick={handleFillDummyData}>{btnText}</button>
      
      <div className='hidden md:flex items-center gap-12'>
        <ul className='flex text-lg items-center gap-6'>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/' >Home</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/history' >History</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/analysis'>Analysis</NavLink></li>
      </ul>

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
