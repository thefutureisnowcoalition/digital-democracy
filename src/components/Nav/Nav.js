import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from './searchbar/SearchBar'
import '../Nav/Nav.css'


function Nav() {


  return (
    <nav className="nav">
      <NavLink to="/" className="navlinks">Home</NavLink>
      <NavLink to="/comparison" className="navlinks">P.C.F</NavLink>
      <SearchBar />

    </nav>
  )
}

export default Nav