// Importacion de styled-componenets
import styled from 'styled-components'

// Exportacion de constantes para estilos del menu
export const Container = styled.div`
    position:relative;
    width: 100%;
    height: 80px;
    z-index: 999;
    background: #fff;
    box-shadow: 1px 2px 2px rgba(0,0,0,.03);
`;
export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    justify-content:center;
    @media screen and (max-width: 968px){
        justify-content:space-between;
    }
`;
export const LogoContainer = styled.div`
    display:flex;
    align-items:center;
    font-size: 1rem;
    font-family: 'Robot',sans-serif;
    display:none;

    @media screen and (max-width: 968px) {
        display:block;
        margin: auto 50px;

        font-size: 0.8rem;
    }
`;
export const Menu = styled.ul`
    height: 100%;
    display:flex;
    justify-content: space-between;
    list-style:none;

    @media screen and (max-width: 968px){
        position:absolute;
        background: #f7f7f7;
        top: 80px;
        left: ${({ open }) => (open ? "0" : "-100%")}; 
        width: 100%;
        height: 90vh;
        justify-content:center;
        flex-direction: column;
        align-items:center;
        transition: 0.5s all ease;
    }
`;
export const MenuItem = styled.li`
    height: 100%;
    @media screen and (max-width: 960px) {
        width: 100%;
        height: 70px
        display: flex;
        justify-content:center;
        align-items:center;
    }
`;

export const MenuItemLink = styled.a`
    display:flex;
    align-items:center;
    justify-content:center;
    height: 100%;
    padding: 0.5rem 2.5rem;
    font-weight: bold;
    font-family: 'Roboto' sans-serif;

    h1 {
        font-size: 20px;
        margin: 0px 10px;
    }

    div {
        display:flex;
        align-items:center;
    }

    a {
        color: #292F36;        
        text-decoration: none;  
    }

    a:hover{
        color: #FF6B6B !important;
        transition: all 0.5s ease;    
    }

    @media screen and (max-width: 960px){
        width: 100%;
    }
`;

// Vista responsive
export const MobileIcon = styled.div`
    display:none;
    
    @media screen and (max-width: 968px){
        display: flex;
        align-items:center;
        cursor: pointer;
        
        svg {
            fill: #292F36;
            margin-right: 50px;
        }
    }
`;