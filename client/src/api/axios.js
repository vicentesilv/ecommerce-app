import axios from 'axios';

const API_URL = "http://localhost:3000/api";

// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default api;


export const iniciarSesion = async (correo, contrasena) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/login`, { correo, contrasena });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error desconocido');
    }
};


export const registrarUsuario = async (nombre, correo, contrasena, rol) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/registro`, { nombre, correo, contrasena, rol });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error desconocido');
    }
};

// export const mostrarProductos = async () => {
//     try{
//         const response = await axios.get('http://localhost:3000/api/productos/mostrarProductos');
//         return response.data;
//     }catch(error){
//         throw error.response ? error.response.data : new Error('Error desconocido');
//     }
// }