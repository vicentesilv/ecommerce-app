import axios from 'axios';

const obtenerCarrito = async (idUsuario) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/carrito/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
};

export default obtenerCarrito;