import React, { useState } from 'react';

// Importando DOM
import { Link } from 'react-router-dom';

// Importando secciones del menu (components | navbar elements)
import {
    Container,
    Menu, MenuItem,
    MenuItemLink,
    Wrapper,
    MobileIcon,
    LogoContainer
} from './Navbar.elements'


// Importando iconos de el menu
import { MdAppRegistration, MdLocalHospital, MdPersonPin } from "react-icons/md";
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    return (

        <Container>
            <Wrapper>
                <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
                    <LogoContainer>
                        <h1>Gestor de enfermeria</h1>
                    </LogoContainer>

                    <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
                        {showMobileMenu ? <FaTimes /> : <FaBars />}
                    </MobileIcon>

                    <Menu open={showMobileMenu}>


                        <MenuItem onClick={() => setShowMobileMenu(!showMobileMenu)}>
                            <MenuItemLink>
                                <Link to="/">
                                    <div>
                                        <FaHome />
                                        <h1>Inicio</h1>
                                    </div>
                                </Link>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem onClick={() => setShowMobileMenu(!showMobileMenu)}>
                            <MenuItemLink>
                                <Link to="/registro-de-consultas">
                                    <div>
                                        <MdAppRegistration />
                                        <h1>Registro de consultas</h1>
                                    </div>
                                </Link>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem onClick={() => setShowMobileMenu(!showMobileMenu)}>
                            <MenuItemLink>
                                <Link to="/registro-de-medicamentos">
                                    <div>
                                        <MdLocalHospital />
                                        <h1>Registro de medicamentos</h1>
                                    </div>
                                </Link>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem onClick={() => setShowMobileMenu(!showMobileMenu)}>
                            <MenuItemLink>
                                <Link to="/acerca-de">
                                    <div>
                                        <MdPersonPin />
                                        <h1>Acerca de</h1>
                                    </div>
                                </Link>
                            </MenuItemLink>
                        </MenuItem>
                    </Menu>
                </IconContext.Provider>
            </Wrapper>
        </Container>
    );
};

export default Navbar