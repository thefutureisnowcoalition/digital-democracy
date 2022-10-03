import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Nav/Nav.css'

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="navlinks">Home</NavLink>
      <NavLink to="" className="navlinks">About Us</NavLink>
      <NavLink to="/comparison" className="navlinks">P.C.F</NavLink>
    </nav>
  )
}

export default Nav