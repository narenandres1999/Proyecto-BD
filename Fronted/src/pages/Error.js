import React, { Component } from 'react'

// Style
import './Style.css'

// Importando imagenes
// Aqui hay un error de logo
import logo from '../assets/logo.png';

export default class Error extends Component {
  render() {
    return (
      <div className='container error404'>
        <img src={logo} alt='' />
        <h1>Error 404</h1>
        <p>¡Lo sentimos, no hemos podido encontrar la página que buscas!</p>
      </div>
    )
  }
}
