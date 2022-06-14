import React, { Component } from 'react'

import { Container, Row, Col } from 'reactstrap';

// Estilos globales
import './Style.css'
import './Inicio.css'

// Datos externos
import { IntegrantesData, DocentesData } from '../data/MainData';

export default class Inicio extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs='12'>
              <h2>¡Bienvenido a nuestro proyecto!</h2>
              <h5>Version de aplicacion: 1.0</h5>
              <p>Este proyecto presenta una solución sobre el actual manejo del sistema de consultas y el registro de medicamentos en el ámbito de enfermería de la Universidad del Valle Sede Palmira, para lo cual consideramos que automatizar su uso mejoraría la eficiencia y rapidez del trabajo del personal encargado, facilitandoles el acceso y disponibilidad inmediata. Además, ofrecería atención de calidad a los alumnos, personal docente y administrativo, permitiendo también mejorar el manejo de información mediante la generación de documentos inmediatos para su uso o corrección.</p>
            </Col>

            <Col>
              <h2>Integrantes de nuestro proyecto</h2>
              <h5>Universidad del valle | Sede Palmira</h5>
              <ul className='integrantes-content'>
                {IntegrantesData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <h6>{item.nombre}</h6>
                    </li>
                  )
                })}
              </ul>
            </Col>

            <Col xs='12'>
            <h2>Docentes y asignaturas</h2>
              <h5>Universidad del valle | Sede Palmira</h5>       
              <ul className='integrantes-content'>
                {DocentesData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <h6>{item.nombre} - {item.asignatura}</h6>
                    </li>
                  )
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
