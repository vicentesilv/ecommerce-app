import React, { useEffect, useState } from 'react';
import './adminUsuarios.css';
import { obtenerUsuarios, eliminarUsuario, editarUsuario } from '../../services/admin.service';
import Navbar from '../../components/navbar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtroRol, setFiltroRol] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('Debe iniciar sesión.');
                    window.location.href = '/inicioSesion';
                }
                const data = await obtenerUsuarios(token);
                setUsuarios(data);
                setFilteredUsuarios(data);
            } catch (err) {
                setError('Error al cargar los usuarios.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    useEffect(() => {
        if (filtroRol) {
            setFilteredUsuarios(usuarios.filter(usuario => usuario.rol === filtroRol));
        } else {
            setFilteredUsuarios(usuarios);
        }
    }, [filtroRol, usuarios]);

    const handleEliminarUsuario = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await eliminarUsuario(id, token);
            alert(response.mensaje || 'Usuario eliminado con éxito.');
            setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        } catch (err) {
            console.error('Error al eliminar el usuario:', err);
            alert('No se pudo eliminar el usuario.');
        }
    };

    const handleEditarUsuario = async (id) => {
        const nuevoRol = prompt('Ingrese el nuevo rol (cliente/vendedor:');
        if (!nuevoRol) return;
        try {
            const token = localStorage.getItem('token');
            const response = await editarUsuario(id, nuevoRol, token);
            alert(response.mensaje || 'Usuario actualizado con éxito.');
            setUsuarios(
                usuarios.map((usuario) =>
                    usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
                )
            );
        } catch (err) {
            console.error('Error al editar el usuario:', err);
            alert('No se pudo actualizar el usuario.');
        }
    };

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='adminUsuarios'>
            <Navbar />
            <div className="adminUsuarios-contenedor">
                <h2>Gestión de Usuarios</h2>
                <select className='filtroRol' onChange={(e) => setFiltroRol(e.target.value)} value={filtroRol}>
                    <option value="">filtrar por</option>
                    <option value="admin">Admin</option>
                    <option value="cliente">cliente</option>
                    <option value="vendedor">vendedor</option>
                </select>
                <div class="hscroll">
                <table cellspacing="0" cellpadding="6">
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Fecha</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td>{new Date(usuario.creado_en).toDateString()}</td>
                                <td>{usuario.rol}</td>
                                <td>
                                    <button className='botonEditar' onClick={() => handleEditarUsuario(usuario.id)}>
                                        Editar Rol
                                    </button>
                                    <button className='botonEliminar' onClick={() => handleEliminarUsuario(usuario.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsuarios;
