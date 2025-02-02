import React, { useEffect, useState } from 'react';
import obtenerCarrito from '../../services/carrito.service';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { idUsuario } = useParams();

    useEffect(() => {
        const cargarCarrito = async () => {
            try {
                const carritoData = await obtenerCarrito(idUsuario);
                setCarrito(carritoData);
            } catch (err) {
                setError('Error al cargar el carrito.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        cargarCarrito();
    }, [idUsuario]);

    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />
            <div className="carrito">
                <h1>Carrito de Compras</h1>
                <ul className="lista-carrito">
                    {carrito.map(({ id, nombre, precio, cantidad }) => (
                    <li key={id} className="item-carrito">
                        <h2>{nombre}</h2>
                        <p>Precio: ${precio}</p>
                        <p>Cantidad: {cantidad}</p>
                        <p>Total: ${(precio * cantidad).toFixed(2)}</p>
                    </li>
                    ))}
            </ul>
        </div>
        </div>
    );
};

export default Carrito;