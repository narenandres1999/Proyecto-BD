import React, { useState } from 'react'
import './Navbar.css';

// Import icons
import * as FaIcons from "react-icons/fa";

// Import routerDOM
import { Link } from 'react-router-dom';

// Import data : Sidebar
import { SidebarData } from '../../data/SidebarData';

// Import image
import logo from '../../assets/logo.png';

import {BiDevices} from 'react-icons/bi'

function Navbar() {

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <div className='navbar'>
                <div className='nav-title'>
                    <Link to='/'>
                        <img src={logo} alt='' />
                        <span>Gestor de enfermeria</span>
                    </Link>
                </div>

                <Link to='#' className='menu-icon-toggle' onClick={showSidebar}>
                    {sidebar ? <FaIcons.FaTimes /> : <FaIcons.FaBars />}
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} onClick={showSidebar}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <div className='nav-text'>
                    <p><BiDevices /></p>
                    <p>Version 0.1</p>
                 </div>
            </nav>


        </>
    )
}

export default Navbar