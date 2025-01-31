import React, { useEffect, useState } from 'react';
import { obtenerProductos, agregarProductoAlCarrito } from '../../services/productos.service'
import './productos-views.css';
import tokenAuth from '../../auth/token.auth';
import Navbar from '../navbar/navbar';
import { Navigate } from 'react-router-dom';
import { use } from 'react';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    useEffect(() => {
        const mostrarProductos = async () => {
            try {
                const token = tokenAuth();
                const productosData = await obtenerProductos(token);
                setProductos(productosData);
                setProductosFiltrados(productosData);
            } catch (err) {
                setError('Error al cargar los productos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        mostrarProductos();
    }, []);

    useEffect(() => {
        if (filtros){
            setProductosFiltrados(productos.filter(producto => producto.categoria === filtros));
        }else{
            setProductosFiltrados(productos);
        }
    },[filtros, productos]);

    const agregarAlCarrito = async (idProducto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debe iniciar sesión para agregar productos al carrito.');
                window.location.href = ('/inicioSesion');
            }
            const response = await agregarProductoAlCarrito(1, idProducto, 1, token); // Suponiendo idUsuario = 1
            alert(response.mensaje || 'Producto agregado al carrito.');
        } catch (err) {
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
                <select name="categoria" id="categoria" onChange={(e) => setFiltros(e.target.value)} value={filtros}>
                    <option>Seleccionar categoría</option>
                    <option value="ropa">Ropa</option>
                    <option value="calzado">Calzado</option>
                    <option value="electrodomesticos">Electrodomésticos</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="gagets">Gadgets</option>
                    <option value="muebles">Muebles</option>
                    <option value="deportes">Deportes</option>
                    <option value="accesorios">Accesorios</option>
                    <option value="juguetes">Juguetes</option>
                    <option value="libros">Libros</option>
                    <option value="musica">Música</option>
                    <option value="peliculas">Películas</option>
                    <option value="videojuegos">Videojuegos</option>
                    <option value="alimentos">Alimentos</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="hogar">Hogar</option>
                    <option value="jardin">Jardín</option>
                    <option value="mascotas">Mascotas</option>
                    <option value="salud">Salud</option>
                    <option value="belleza">Belleza</option>
                    <option value="ropa">Ropa</option>
                    <option value="calzado">Calzado</option>
                    <option value="accesorios">Accesorios</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="deportes">Deportes</option>
                    <option value="juguetes">Juguetes</option>
                    <option value="libros">Libros</option>
                    <option value="musica">Música</option>
                    <option value="peliculas">Películas</option>
                    <option value="videojuegos">Videojuegos</option>
                    <option value="alimentos">Alimentos</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="hogar">Hogar</option>
                    <option value="jardin">Jardín</option>
                    <option value="mascotas">Mascotas</option>
                    <option value="salud">Salud</option>
                    <option value="belleza">Belleza</option>
                </select>
                <input type="text" placeholder="Buscar producto" />
                <button>Buscar</button>
            </div>

            {/* Lista de productos */}
            <ul className="lista-productos">
                {productosFiltrados.map((producto) => (
                    <li key={producto.id} className="tarjeta-producto">
                        <h2>{producto.nombre}</h2>
                        <p>{producto.descripcion}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p>categoria: {producto.categoria}</p>
                        {producto.imagen && (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/productos/imagen/${producto.imagen}`}
                                alt={producto.nombre}
                                style={{ width: '200px', height: '200px' }}
                            />
                        )}
                        <input type="number" name="" id="" max={producto.stock} />
                        <p>Stock: {producto.stock}</p>
                        <button
                            className="boton-agregar-carrito"
                            onClick={() => agregarAlCarrito(producto.id)}
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
