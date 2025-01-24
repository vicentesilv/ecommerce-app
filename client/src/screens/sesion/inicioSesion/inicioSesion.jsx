// import api from "../../../api/axios";
// import React, { useState } from 'react';

import React, { useState } from "react";
import api from "../../../api/axios";
import "./inicioSesion.css"

function InicioSesion() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setMensajeError('');
        setCargando(true);

        try {
            if (!correo || !contrasena) {
                throw new Error('Por favor, complete todos los campos');
            }
            const data = await api.post('/usuarios/login', { correo, contrasena });
            localStorage.setItem('token', data.token);
            window.location.href = '/'; // Redirigir a la pantalla principal
        } catch (error) {
            setMensajeError(error.error || 'Error al iniciar sesión');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="contenedor-inicio-sesion">
            <form onSubmit={manejarEnvio} className="formulario">
                 <h1>Iniciar Sesión</h1>
                <div className="contenido">
                    <label>email</label>
                    <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                </div>
                <div className="contenido">
                    <label>Contraseña</label>
                     <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                </div>
                
                <button type="submit" disabled={cargando} className="botonsesion">
                    {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>
            </form>
            {mensajeError && <p>{mensajeError}</p>}
        </div>
    );
}

export default InicioSesion