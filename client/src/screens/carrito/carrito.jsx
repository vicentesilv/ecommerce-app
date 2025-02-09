import React, { useEffect, useState } from 'react';
import {obtenerCarrito,  eliminarProducto, vaciarCarrito } from '../../services/carrito.service';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './carrito.css';

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [metodoPago, setMetodoPago] = useState("");
    // cosnt [metodoPago, setMetodoPago] = useState("");
    const [error, setError] = useState(null);
    const { idUsuario } = useParams();
    const crearPedido = async (metodoPago) => {
        try {
            // console.log(idUsuario, metodoPago);
            
            const response = await axios.post(
                `${apiUrl}/ordenes/crearOrden/${idUsuario}`,
                { metodoPago }
            );
            window.location.reload();
            return response.data;
        } catch (error) {
            throw error;
        }
    }

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
               <div className="carrito-container">
                   <ul className="lista-carrito">
                        {carrito.map(({ id, nombre, precio, cantidad }) => (
                        <li key={id} className="item-carrito">
                            <h1>{id}</h1>
                            <h2>{nombre}</h2>
                            <p>Precio: ${precio}</p>
                            <p>Cantidad: {cantidad}</p>
                            <p>Total: ${(precio * cantidad).toFixed(2)}</p>
                            <button onClick={() => eliminarProducto(id) }>Eliminar producto</button>
                        </li> ))}
                    </ul>
                    <select name="metodoPago" id="metodoPago" onChange={(e) => setMetodoPago(e.target.value)} value={metodoPago}>
                        <option value="">Seleccione un metodo de pago"</option>
                        <option value="1">tarjeta de credito</option>
                        <option value="2">paypal</option>
                        <option value="3">transferencia bancaria</option>
                    </select>
                    <button onClick={() => crearPedido(metodoPago)}>comprar</button>
                    <button onClick={() => vaciarCarrito(localStorage.getItem('id'))}>vaciar carrito</button>
               </div>

        </div>
        </div>
    );
};

export default Carrito;