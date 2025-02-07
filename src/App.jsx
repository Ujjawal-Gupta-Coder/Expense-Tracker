import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Navpanel from './components/Navpanel'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const App = () => {
  const [navpanel, setNavpanel] = useState(false);
  return (
    <> 
    <Navbar navpanel={navpanel}  setNavpanel={setNavpanel}/>
    {navpanel && <Navpanel navpanel={navpanel}  setNavpanel={setNavpanel}/>}
      
    <div className='mt-[70px]'>
      <Outlet/>
    </div>

    <Footer />
    </>
  )
}

export default App
