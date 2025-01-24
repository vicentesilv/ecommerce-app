import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Productos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Obtener productos del backend
        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos/mostrarProductos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        <h2>{producto.nombre}</h2>
                        <p>{producto.descripcion}</p>
                        <p>Precio: ${producto.precio}</p>
                        {producto.imagen && (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/productos/imagen/${producto.imagen}`}
                                alt={producto.nombre}
                                style={{ width: '200px', height: '200px' }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Productos;
