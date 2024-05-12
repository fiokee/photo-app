import React, { Fragment , useState} from 'react';
import {Link} from 'react-router-dom'
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.css'
import Backdrop from '../Backdrop/Backdrop';
import { ImEarth} from "react-icons/im";


const MainNavigation = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = ()=>{
    setOpenDrawer(true);
  };

  const handleDrawerClose =()=>{
    setOpenDrawer(false);
  }
  return (
    <Fragment>
      {openDrawer && (<Backdrop onClick={handleDrawerClose}/>)};

      <SideDrawer show={openDrawer} onClick={handleDrawerClose}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks/>
        </nav>
      </SideDrawer>
     

    <MainHeader>
      <button className='main-navigation__menu-btn' onClick={handleDrawerOpen}>
        <span/>
        <span/>
        <span/>
      </button>
        <h1 className='main-navigation__title'>
        <Link to="/" ><ImEarth/></Link>
      </h1>
      <nav className='main-navigation__header-nav'>
       <NavLinks/>
      </nav>
    </MainHeader>
    </Fragment>
  )
}

export default MainNavigation
