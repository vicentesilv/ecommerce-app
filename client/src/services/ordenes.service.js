import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const crearOrden = async (orden) => {
    try {
        await axios.post(`${apiUrl}/ordenes`, orden);
    } catch (error) {
        throw error;
    }
}