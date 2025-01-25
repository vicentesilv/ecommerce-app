import React from 'react';
// import Productos from './components/Productos';
// import FormularioProducto from './components/FormularioProducto';

// import Productos from './components/Productos';

import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './screens/home/home';
import Registro from './screens/sesion/registro/registro';
import InicioSesion from './screens/sesion/inicioSesion/inicioSesion';
import Productos from './components/producto-client/productosviews';
import Page404 from './screens/page404/page404';

function App() {
    return (
        // <Productos />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/inicioSesion" element={<InicioSesion />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
