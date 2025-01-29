import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los usuarios
export const obtenerUsuarios = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/usuarios/mostrarUsuarios`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        alert('Error al obtener usuarios: token invalido');
    }
};

// Eliminar usuario por ID
export const eliminarUsuario = async (id, token) => {
    const response = await axios.delete(`${API_URL}/usuarios/eliminarUsuario/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Editar rol del usuario
export const editarUsuario = async (id, rol, token) => {
    const response = await axios.put(
        `${API_URL}/usuarios/editarUsuario/${id}`,
        {rol},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};