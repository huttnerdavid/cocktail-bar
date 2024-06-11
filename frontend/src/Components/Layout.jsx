import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <nav className='navBar'>
        <Link to="/" className='linkElements'>Home</Link>
        <Link to="/cocktails" className='linkElements'>Search for Cocktail</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout
