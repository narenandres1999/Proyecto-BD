import { AiOutlineHtml5 } from "react-icons/ai";
import { FaReact, FaNode } from "react-icons/fa";
import { SiPostgresql, SiVisualstudiocode, SiExpress } from 'react-icons/si'
import { GiTeacher } from 'react-icons/gi'
import { IoPersonCircleSharp } from 'react-icons/io5'

export const IntegrantesData = [
    {
        // Andres Felipe Osorio Alarcon
        nombre: 'Andres Felipe Osorio Alarcon',
        codigo: '20508657-2711',
        instagram: '@andresalarcon.co',
        whatsapp: '+57 3007523347',
        icon: <IoPersonCircleSharp />,
        cName: 'item'
    },
    {
        // Naren Andres Medina Jaramillo
        nombre: 'Naren Andres Medina Jaramillo',
        codigo: '2059393-2711',
        instagram: '',
        icon: <IoPersonCircleSharp />,        
        whatsapp: '',
        cName: 'item'
    },
    {
        // Alejandro Arenas Rodriguez
        nombre: 'Alejandro Arenas Rodriguez',
        codigo: '',
        instagram: '',
        icon: <IoPersonCircleSharp />,        
        whatsapp: '',
        cName: 'item'
    },
    {
        // Juan David Rios Riascos
        nombre: 'Juan David Rios Riascos',
        codigo: '20508657-2711',
        instagram: '',
        whatsapp: '',
        icon: <IoPersonCircleSharp />,        
        cName: 'item'
    },            
]

export const DocentesData = [
    {
        nombre: 'JOHN ALEXANDER CAMACHO SANCHEZ',
        asignatura: 'DESARROLLO DE SOFTWARE',
        icon: <GiTeacher />,     
        cName: 'item'        
    },  
    {
        nombre: 'JEFFERSON A. PEÑA TORRES',
        asignatura: 'BASE DE DATOS',
        icon: <GiTeacher />,     
        cName: 'item'        
    }    
]

export const Tecnologias = [
    {
        icono: <AiOutlineHtml5 />,
        nombre: 'HTML5',
        cName: 'tecnologias-item'
    },    
    {
        icono: <FaReact />,
        nombre: 'REACT',
        cName: 'tecnologias-item'
    },    
    {
        icono: <SiPostgresql />,
        nombre: 'POSTGREE',
        cName: 'tecnologias-item'
    },    
    {
        icono: <SiVisualstudiocode />,
        nombre: 'VS Code',
        cName: 'tecnologias-item'
    },    
    {
        icono: <FaNode />,
        nombre: 'NODE',
        cName: 'tecnologias-item'
    },    
    {
        icono: <SiExpress />,
        nombre: 'Express',
        cName: 'tecnologias-item'
    }   
]