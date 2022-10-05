import React, {useState} from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../Nav/Nav.css'


function Nav() {
  //This is where we will store our users search query as a string under the key of value
  const [searchText, setSearchText] = useState({text: ''})
  //Our search button's destination route is unknown until we determine what type of search the user is doing...
  const [linkRoute, setLinkRoute] = useState('')
  

  

  //We need to run some validation to determine if the user is trying a zipcode search or a politician name search
  function checkZipOrAddress (value){
    //** We will need to strengthen this validation in the future **
     if(value.match("[0-9]+")){
      //We see a street number entered in the searchbar - its implied this is an address. Lets set our links to= attribute
       console.log('A number is here, must be an address')
       setLinkRoute(`/civics/${value}`)
     } else {
      //Not seeing numbers, must be a politician. Lets set our links to= attribute
       console.log('Not a number.. maybe this is a politician search?')
       setLinkRoute(`/comparison/${value}`)
     }
  }
  
  //When searchbar input changes, lets update our searchText value
  function handleChange(event) {

      const target = event.target;
      const name = target.name;
      const value = target.value;
  
      checkZipOrAddress(value)
      setSearchText({
        ...searchText,
        [name]: value,
      });
      console.log(searchText);

  }

  function clearSearchText(){
    setSearchText({text: ''})
  }
  

  return (
    <nav className="nav">
      <NavLink to="/" className="navlinks">Home</NavLink>
      <NavLink to="/comparison" className="navlinks">P.C.F</NavLink>

        <input className="form-control me-2 searchbarstyle" onChange={handleChange} value={searchText.text} name="text" placeholder="Search politicians, or by address" aria-label="Search" />
        <Link to={linkRoute} onClick={clearSearchText} className="btn text-white">Search</Link>

    </nav>
  )
}

export default Nav