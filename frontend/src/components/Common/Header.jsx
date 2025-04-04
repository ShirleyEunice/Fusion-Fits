import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className="border-b border-gray-200">
    {/* Topbar */}
    <Topbar></Topbar>
    {/* Navbar  */}
    <Navbar></Navbar>
    {/* Cart Drawer */}
    </header>
  )
}

export default Header