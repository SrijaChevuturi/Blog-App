import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import {Outlet} from 'react-router-dom'

function RouteLayout() {
  return (
    <div>
        <Navbar></Navbar>
        {/* Place holder component */}
        <div style={{minHeight: "80vh" }}> 
        <Outlet></Outlet>
        </div>
        <Footer />

    </div>
  )
}


export default RouteLayout
