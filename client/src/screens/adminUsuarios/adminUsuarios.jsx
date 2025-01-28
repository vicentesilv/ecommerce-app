import React, { useEffect, useState } from 'react';
// import {
//     obtenerUsuarios,
//     eliminarUsuario,
//     editarUsuario,
// } from '../adminUsuarios/admin.service';

import { obtenerUsuarios, eliminarUsuario, editarUsuario } from '../../services/admin.service';

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('Debe iniciar sesión.');
                    window.location.href = '/inicioSesion';
                    return;
                }

                const data = await obtenerUsuarios(token);
        
                setUsuarios(data);
            } catch (err) {
                setError('Error al cargar los usuarios.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

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
        const nuevoRol = prompt('Ingrese el nuevo rol (admin/usuario):');
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
        <div>
            <h2>Gestión de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <button onClick={() => handleEditarUsuario(usuario.id)}>
                                    Editar Rol
                                </button>
                                <button onClick={() => handleEliminarUsuario(usuario.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsuarios;
