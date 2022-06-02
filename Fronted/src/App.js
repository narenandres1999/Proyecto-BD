import React, { Component } from 'react'
import Navbar from './components/Navbar';

// Import REACT-ROUTER-DOM
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importando las paginas
import Inicio from './pages/Inicio';
import RegistroConsultas from './pages/RegistroConsultas';
import RegistroMedicamentos from './pages/RegistroMedicamentos';
import AcercaDe from './pages/AcercaDe';
import ErrorPage from './pages/ErrorPage';

export default class App extends Component {

  // Navbar :: Menu
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Inicio />} />
            <Route path='/registro-de-consultas' element={<RegistroConsultas />} />
            <Route path='/registro-de-medicamentos' element={<RegistroMedicamentos />} />
            <Route path='/acerca-de' element={<AcercaDe />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

