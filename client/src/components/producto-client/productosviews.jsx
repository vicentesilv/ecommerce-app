import React, { useEffect, useState } from 'react';
import { obtenerProductos, agregarProductoAlCarrito } from '../../services/productos.service'
import './productos-views.css';
import tokenAuth from '../../auth/token.auth';
import Navbar from '../navbar/navbar';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const token = tokenAuth();

                const productosData = await obtenerProductos(token);
                setProductos(productosData);
            } catch (err) {
                setError('Error al cargar los productos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const handleAgregarAlCarrito = async (idProducto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debe iniciar sesión para agregar productos al carrito.');
                return;
            }

            const response = await agregarProductoAlCarrito(1, idProducto, 1, token); // Suponiendo idUsuario = 1
            alert(response.mensaje || 'Producto agregado al carrito.');
        } catch (err) {
            console.error('Error al agregar el producto al carrito:', err);
            alert('No se pudo agregar el producto al carrito.');
        }
    };

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />
            <div className="contenedor-productos">
            {/* Filtros de búsqueda */}
            <div className="filtrado-productos">
                <select name="categoria" id="categoria">
                    <option>Seleccionar categoría</option>
                    <option value="ropa">Ropa</option>
                    <option value="categoria2">Categoría 2</option>
                    <option value="categoria3">Categoría 3</option>
                </select>
                <input type="text" placeholder="Buscar producto" />
                <button>Buscar</button>
            </div>

            {/* Lista de productos */}
            <ul className="lista-productos">
                {productos.map((producto) => (
                    <li key={producto.id} className="tarjeta-producto">
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
                        <button
                            className="boton-agregar-carrito"
                            onClick={() => handleAgregarAlCarrito(producto.id)}
                        >
                            Agregar al Carrito
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default Productos;
