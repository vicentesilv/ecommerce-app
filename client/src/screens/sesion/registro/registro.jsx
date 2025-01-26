import React, { useState } from "react";
import axios from "axios";
// import { registrarUsuario } from "../../../api/axios";
import "./registro.css"
// import  sesion  from "../../../api/api.service";

function Registro() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [constrasena2, setContrasena2] = useState('');
    const [rol, setRol] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setMensajeError('');
        setCargando(true);


        try {
            if (contrasena !== constrasena2) {
                throw new Error('Las contrasenas no coinciden');
            }
            const response = await axios.post(`http://localhost:3000/api/usuarios/registro`, { nombre, correo, contrasena, rol });
            // return response.data;
            
            window.location.href = '/inicioSesion';
        } catch (error) {
            // throw error.response ? error.response.data : new Error('Error desconocido');
            setMensajeError(error.error || 'Error al registrar usuario');
        } finally {
            setCargando(false);
        }
    };


    return (
        <div className="contenedor-registro">
            <form onSubmit={manejarEnvio} className="formulario">
                <h1>Registrarse</h1>
                <div className="contenido">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="contenido">
                    <label>Correo:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="contenido">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <div className="contenido">
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={constrasena2}
                        onChange={(e) => setContrasena2(e.target.value)}
                    />
                </div>
                <div className="contenido">
                    <label>Rol:</label>
                    <select value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="cliente">cliente</option>
                        <option value="vendedor">vendedor</option>
                    </select>
                </div>
                {mensajeError && alert(mensajeError)}
                <button type="submit">
                {cargando &&"Cargando..."|| "Registrar"} 
                </button>
               
            </form>
        </div>
    )
}


export default Registro