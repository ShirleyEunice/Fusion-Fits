import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
    {/* Header */}
    <Header></Header>
    {/* Main content*/}
    <main>
      <Outlet/>{/*It will replace child component depending upon route component we access */}
    </main>
    {/* Footer */}
    <Footer></Footer>
    </>
  )
}

export default UserLayout;