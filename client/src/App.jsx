import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';

import Home from './screens/home/home';
import Registro from './screens/registro/registro';
import InicioSesion from './screens/inicioSesion/inicioSesion';
import Productos from './components/producto-client/productosviews';
import Page404 from './screens/page404/page404';
import AdminUsuarios from './screens/adminUsuarios/adminUsuarios';
import VerificarRol from './auth/verificarRol';

function App() {
    return (
        // <Productos />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/inicioSesion" element={<InicioSesion />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/adminUsuarios" element={<AdminUsuarios />} />
                <Route path="/rol" element={<VerificarRol />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
