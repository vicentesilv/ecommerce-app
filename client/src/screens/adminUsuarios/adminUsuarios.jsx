import "./adminUsuarios.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";

function AdminUsuarios() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Obtener productos del backend
        const mostrarUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    document.write('no ha iniciado sesión');
                    setTimeout(() => {
                        window.location.href = '/inicioSesion';
                    }, 2000);
                }
                // const response = await axios.get('http://localhost:3000/api/productos/mostrarProductos',
                //     {
                //         headers: {
                //             'Authorization': `Bearer ${token}`
                //         },
                //     }
                // );
                const response = await axios.get('http://localhost:3000/api/usuarios/mostrarUsuarios',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                });
                console.log(response.data);

                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                alert('Error al obtener los productos');
                
            }
        };

        mostrarUsuarios();
    }, []);

    const agregarAlCarrito = async (idProducto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debe iniciar sesión para agregar productos al carrito');
                return;
            }

            const response = await axios.post('http://localhost:3000/api/carrito/agregarCarrito',
                { idUsuario:1,idProducto, cantidad: 1 },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.mensaje || 'Producto agregado al carrito');
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            alert('No se pudo agregar el producto al carrito');
        }
    };
    

    return (
        <div className='contenedor-productos'>
            <div className='filtrado-productos'>
                <select name="categoria" id="categoria">
                    <option>seleccionar categoria</option>
                    <option value="categoria1">ropa</option>
                    <option value="categoria2">Categoria 2</option>
                    <option value="categoria3">Categoria 3</option>
                </select>
                <input type="text" name="" id="" placeholder='buscar producto'/>
                <button>Buscar</button>
            </div>

            <ul className='lista-productos'>
                {usuarios.map((producto) => (
                    <li key={producto.id} className='tarjeta-producto'>
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
                            className='boton-agregar-carrito'
                            onClick={() => agregarAlCarrito(producto.id)}
                        >
                            Agregar al Carrito
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsuarios;