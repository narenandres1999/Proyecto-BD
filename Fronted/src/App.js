import React, { Component } from 'react'
import './App.css'

// Import reactDOM
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Import routes : Pages
import Inicio from './pages/Inicio'
import Datos from './pages/Datos'
import Consultas from './pages/Consultas/Consultas'
import Medicamentos from './pages/Medicamentos'
import Error from './pages/Error'

// Import components
import Navbar from './components/navbar/Navbar'

export default class App extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <div className='container'>
                    <Routes>
                        <Route path='/' exact element={<Inicio />} />
                        <Route path='/datos' element={<Datos />} />                        
                        <Route path='/consultas' element={<Consultas />} />
                        <Route path='/medicamentos' element={<Medicamentos />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </div>
            </Router>
        )
    }
}
