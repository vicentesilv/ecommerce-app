import axios from 'axios';

export const obtenerCarrito = async (idUsuario) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/carrito/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
};

export const eliminarProducto = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/carrito/${id}`);
        window.location.reload();
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
}

