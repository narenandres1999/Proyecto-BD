import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
    {
        path: '/',
        title: 'Inicio',
        icon: <FaIcons.FaHome />,
        cName: 'nav-text'
    },
    {
        path: '/datos',
        title: 'Datos',
        icon: <FaIcons.FaTasks />,
        cName: 'nav-text'
    },    
    {
        path: '/consultas',
        title: 'Consultas',
        icon: <FaIcons.FaClipboardList />,
        cName: 'nav-text'
    },
    {
        path: '/medicamentos',
        title: 'Medicamentos',
        icon: <FaIcons.FaBriefcaseMedical />,
        cName: 'nav-text'
    }     
]