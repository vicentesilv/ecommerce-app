import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';

import Home from './screens/home/home';
import Registro from './screens/registro/registro';
import InicioSesion from './screens/inicioSesion/inicioSesion';
import Productos from './screens/producto-client/productosviews';
import Page404 from './screens/page404/page404';
import AdminUsuarios from './screens/adminUsuarios/adminUsuarios';
import VerificarRol from './auth/verificarRol';
import CerrarSesion from './auth/cerrarSesion.auth';
import Carrito from './screens/carrito/carrito';
import MiPerfil from './screens/miPerfil/miPerfil';

function App() {
    return (
        // <Productos />
        <BrowserRouter>
            <Routes>
                {/* rutas de productos */}
                <Route path="/" element={<Productos />} />
                <Route path="/carrito/:idUsuario" element={<Carrito />} />
                <Route path="/miPerfil" element={<MiPerfil />} />
                {/* ordenes */}
                
                {/* rutas de admin */}
                <Route path="/adminUsuarios" element={<AdminUsuarios />} />
                
                {/*rutas de vendedor
                        adminProductos //ver,editar,eliminar
                        crearProducto
                */}


                {/* rutas de informacion y  de sesion */}
                <Route path="/informacion" element={<Home />} />
                <Route path="/inicioSesion" element={<InicioSesion />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/cerrarSesion" element={<CerrarSesion />} />
                
                {/* rutas de utilidades */}
                -<Route path="/rol" element={<VerificarRol />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
