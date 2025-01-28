import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registrarUsuario = async (nombre,correo,contrasena,rol) => {
    try{
        const response = await axios.post(`http://localhost:3000/api/usuarios/registro`, { nombre, correo, contrasena, rol });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Error al registrar usuario');
    }
};


export const iniciarSesion = async (correo, contrasena) => {
    try{
        const response = await axios.post(`${API_URL}/usuarios/login`,{correo, contrasena});        
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Error al iniciar sesion');
    }
};