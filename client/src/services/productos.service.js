import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Obtener productos
export const obtenerProductos = async () => {
    const response = await axios.get(`${API_URL}/productos/mostrarProductos`);
    return response.data;
};

// Agregar producto al carrito
export const agregarProductoAlCarrito = async (idUsuario, idProducto, cantidad, token) => {
    const response = await axios.post(
        `${API_URL}/carrito/agregarCarrito`,
        { idUsuario, idProducto, cantidad },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const buscarProductos = async (busqueda) => {
    const response = await axios.get(`${API_URL}/productos/obtnerProducto/${busqueda}`);
    return response.data;
};