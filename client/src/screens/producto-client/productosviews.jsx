import React, { useEffect, useState } from 'react'; 
import { obtenerProductos, agregarProductoAlCarrito } from '../../services/productos.service';
import './productos-views.css';
import tokenAuth from '../../auth/token.auth';
import Navbar from '../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';

const CATEGORIAS = [
    "ropa", "calzado", "electrodomesticos", "tecnologia", "gadgets", "muebles", "deportes",
    "accesorios", "juguetes", "libros", "musica", "peliculas", "videojuegos", "alimentos",
    "bebidas", "hogar", "jardin", "mascotas", "salud", "belleza"
];

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const productosData = await obtenerProductos();
                setProductos(productosData);
            } catch (err) {
                setError('Error al cargar los productos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        cargarProductos();
    }, []);

    const productosFiltrados = productos.filter(producto => {
        const coincideCategoria = filtros ? producto.categoria.toLowerCase() === filtros.toLowerCase() : true;
        const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCategoria && coincideBusqueda;
    });

    const agregarAlCarrito = async (idProducto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debe iniciar sesión para agregar productos al carrito.');
                return navigate('/inicioSesion');
            }
            const usuarioId = localStorage.getItem('id');
            const response = await agregarProductoAlCarrito(usuarioId, idProducto, cantidad, token);
            alert(response.mensaje || 'Producto agregado al carrito.');
        } catch {
            alert('No se pudo agregar el producto al carrito.');
        }
    };

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='productos'>
            <Navbar />
            <div className="contenedor-productos">
                <div className="filtrado-productos">
                    <select name="categoria" id="categoria" onChange={(e) => setFiltros(e.target.value)} value={filtros}>
                        <option value="">Seleccionar categoría</option>
                        {CATEGORIAS.map(categoria => (
                            <option key={categoria} value={categoria}>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</option>
                        ))}
                    </select>
                    <input 
                        type="text" 
                        placeholder="Buscar producto" 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button>Buscar</button>
                </div>
                <ul className="lista-productos">
                    {productosFiltrados.map(({ id, nombre, descripcion, precio, categoria, imagen, stock }) => (
                        <li key={id} className="tarjeta-producto">
                            <h2>{nombre}</h2>
                            <p>{descripcion}</p>
                            <p>Precio: ${precio}</p>
                            <p>Categoría: {categoria}</p>
                            {imagen ? (
                                <img  src={`${import.meta.env.VITE_API_URL}/productos/imagen/${imagen}`}  alt={nombre}  style={{ width: '200px', height: '200px' }} />
                            ) : (
                                <p>Sin imagen disponible</p>
                            )}
                            <input type="number" value={cantidad} max={stock} min="1" onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 1)}  />
                            <p>Stock: {stock}</p>
                            <button className="boton-agregar-carrito" onClick={() => agregarAlCarrito(id)}>Agregar al Carrito</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Productos;