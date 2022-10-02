import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Nav/Nav.css'

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="navlinks">Home</NavLink>
      <NavLink to="" className="navlinks">About Us</NavLink>
      <NavLink to="" className="navlinks">Sign In</NavLink>
    </nav>
  )
}

export default Nav