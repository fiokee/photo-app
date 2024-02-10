import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { AuthContext } from '../../context/auth-context';
import Button from '../../formElement/Button/Button';


const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to="/" exact>All Users</NavLink>
      </li>
      {auth.isLogedIn &&(
        <li>
        <NavLink to="/u1/places">My Places</NavLink>
      </li>
      )}
      
      {auth.isLogedIn &&(
      <li>
        <NavLink to="/Newplaces">Add Place</NavLink>
      </li>
      )}

      {!auth.isLogedIn && (

      <li>
        <NavLink to="/auth">Login</NavLink>
      </li>
      )}

      {
        auth.isLogedIn && (
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        )
      }
    </ul>
  )
}

export default NavLinks
