import React, { Component } from 'react'
import './AcercaDe.css'

// Importar imagenes
import banner from '../assets/banner01.png';
import team from '../assets/team.png';

export default class AcercaDe extends Component {
  render() {
    return (
      <div className='container'>

        <div className='content'>
          <div className='title'>
            <h1>Integrantes del proyecto</h1>
            <hr />            
          </div>
          <div className='content-information'>
            <ul>
              <li>NAREN ANDRES MEDINA JARAMILLO</li>
              <li>ALEJANDRO ARENAS RODRIGUEZ</li>
              <li>JUAN DAVID RIOS RIASCOS</li>
              <li>ANDRES FELIPE OSORIO ALARCON</li>
            </ul>

          </div>
        </div>

        <div className='content'>
          <div className='content-information, image'>
            <img src={team} alt=""/>
            <img src={banner} alt="" className='banner'/>
          </div>
        </div>

      </div>

      
    )
  }
}