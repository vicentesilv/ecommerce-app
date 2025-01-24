import React from 'react';
// import Productos from './components/Productos';
// import FormularioProducto from './components/FormularioProducto';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './screens/home/home';
import Registro from './screens/sesion/registro/registro';
import InicioSesion from './screens/sesion/inicioSesion/inicioSesion';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/inicioSesion" element={<InicioSesion />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
