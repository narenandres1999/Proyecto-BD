import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// CSS
import './index.css';
import React from 'react'

// Import reactDOM
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Import routes : Pages
import Inicio from './pages/Inicio'
import Consultas from './pages/Consultas'
import Medicamentos from './pages/Medicamentos'
import Error from './pages/Error'

// Import components
import Navbar from './components/navbar/Navbar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
                <Router>
                <Navbar />
                <div className='container'>
                    <Routes>
                        <Route path='/' exact element={<Inicio />} />                     
                        <Route path='/consultas' element={<Consultas />} />
                        <Route path='/medicamentos' element={<Medicamentos />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </div>
            </Router>
  </React.StrictMode>
);