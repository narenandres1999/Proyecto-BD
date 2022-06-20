import React, { Component } from 'react'

import { Container, Row, Col } from 'reactstrap';

// Estilos globales
import './Style.css'
import './Inicio.css'

// Datos externos
import { IntegrantesData, DocentesData, Tecnologias } from '../data/MainData';
import enfermera from '../assets/enfermera.png'
import Footer from '../components/footer/Footer'

// Import data

export default class Inicio extends Component {
  render() {
    return (
      <>
        <div className='inicio pt-5'>
          <Container fluid>
            <Row className='theme-row'>
              <Col className='theme-col' md={7}>
                <div className='theme-content'>
                  <h2>Proyecto para la gestion de enfermeria</h2>
                  <p>Este proyecto presenta una solución sobre el actual manejo del sistema de consultas y el registro de medicamentos en el ámbito de enfermería de la Universidad del Valle Sede Palmira, para lo cual consideramos que automatizar su uso mejoraría la eficiencia y rapidez del trabajo del personal encargado, facilitandoles el acceso y disponibilidad inmediata. Además, ofrecería atención de calidad a los alumnos, personal docente y administrativo, permitiendo también mejorar el manejo de información mediante la generación de documentos inmediatos para su uso o corrección.</p>
                </div>
              </Col>
              <Col className='theme-col' md={5}>
                <img src={enfermera} alt='' />
              </Col>
            </Row>
          </Container>

          <Container>
            <Row className='w-100'>
              <Col>
                <div className='theme-content tecnologias-content'>
                  <h2>Tecnologias usadas para este proyecto</h2>
                </div>
              </Col>
              <Col md={12}>
                <ul className='tecnologias-list'>
                  {Tecnologias.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <i>{item.icono}</i>
                        <h4>{item.nombre}</h4>
                      </li>
                    )
                  })}
                </ul>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col md={6}>
                <div className='theme-content flex-column d-flex justify-content-center align-self-center centered'>
                  <h2>Integrantes del proyecto</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisi odio, egestas eget diam ut, tincidunt hendrerit lorem. Vivamus odio urna, pharetra quis enim ut, eleifend semper ex.</p>
                </div>
              </Col>

              <Col md={6}>
              <ul className='item-list centered'>
                  {IntegrantesData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <i>{item.icon}</i>
                        <p>{item.nombre}</p>
                      </li>
                    )
                  })}
                </ul>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col md={6}>
                <div className='theme-content flex-column d-flex justify-content-center align-self-center centered'>
                  <h2>Docentes del proyecto</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisi odio, egestas eget diam ut, tincidunt hendrerit lorem. Vivamus odio urna, pharetra quis enim ut, eleifend semper ex.</p>
                </div>
              </Col>

              <Col md={6}>
                <ul className='item-list centered'>
                  {DocentesData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <i>{item.icon}</i>
                        <p>{item.nombre}</p>
                      </li>
                    )
                  })}
                </ul>
              </Col>
            </Row>
          </Container>  

          <Footer />
        </div>
      </>
    )
  }
}
