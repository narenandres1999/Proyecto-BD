import React, { Component } from 'react'
import "./Inicio.css";

import botiquin from '../assets/botiquin.png';
import banner from '../assets/banner.png';

export default class Inicio extends Component {
  render() {
    return (
      <div className="Inicio">
          <img src={banner} alt="" className="banner" />
          <img src={botiquin} alt="" />
          <h1>Gestor de <font color="#FF6B6B">Enfermeria</font></h1>
      </div>
    )
  }
}
