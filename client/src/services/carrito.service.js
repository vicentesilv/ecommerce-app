import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const obtenerCarrito = async (idUsuario) => {
    try {
        const response = await axios.get(`${apiUrl}/carrito/${idUsuario}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const eliminarProducto = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/carrito/${id}`);
        window.location.reload();
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const vaciarCarrito = async(id) =>{
    try{
        const response = await axios.delete(`${apiUrl}/carrito/vaciar/${id}`);  
        window.location.reload();
        return response.data;
    }catch(error){
        throw error;
    }
}

