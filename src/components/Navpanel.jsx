import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import store from '../store';
import dummyData from '../../dummyData.json'
const Navpanel = ({navpanel, setNavpanel}) => {
    
    const {expenseData, setExpenseData, demoMode, toggleDemoMode} = store();
    const [btnText, setBtnText] = useState( localStorage.getItem("demoMode") === "true" ? "❌ Exit Demo Mode ❌" : "✨ Try Demo: Fill with Sample Data ✨");
    const ShowCloseNavPanel = () => {
        setNavpanel(!navpanel);
    }


    const handleFillDummyData = () => {
      if(demoMode) {
        localStorage.setItem("expenseData", localStorage.getItem("backupData"))
        setExpenseData(localStorage.getItem("backupData") ? JSON.parse(localStorage.getItem("backupData")) : []);
      }
      else {
        localStorage.setItem("backupData", JSON.stringify(expenseData))

        localStorage.setItem("expenseData", JSON.stringify(dummyData))
        setExpenseData(dummyData);
      }
      toggleDemoMode()
      ShowCloseNavPanel();
  }
  return (
    <div className='fixed md:hidden top-[70px] w-full h-full z-10'>
     <ul className='text-2xl bg-slate-800 pt-12 w-full h-full flex flex-col items-center gap-y-10  text-white'>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/' onClick={ShowCloseNavPanel}>Home</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/history' onClick={ShowCloseNavPanel}>History</NavLink></li>
          <li className='cursor-pointer hover:text-rose-500 hover:font-bold hover:border-b-2 hover:border-rose-800'><NavLink to='/analysis' onClick={ShowCloseNavPanel}>Analysis</NavLink></li>
          <div className='h-[1px] bg-white w-[80%]'></div>
          <button className='border-1 mx-2 border-sky-600 px-4 py-1 font-patrick rounded-lg bg-gradient-to-tr from-purple-200 to-slate-300 hover:from-purple-500 text-black hover:to-slate-800 hover:text-white hover:-translate-y-2 transition' onClick={handleFillDummyData}>{btnText}</button>
    </ul>
    </div>

  )
}

export default Navpanel
