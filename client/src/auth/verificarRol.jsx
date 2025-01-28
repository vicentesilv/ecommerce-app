import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerificarRol = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verificarRol = async () => {
      try {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No hay token disponible. Redirigiendo al inicio de sesión.');
        }

        // Realizar la petición a la API para verificar el rol
        const response = await axios.get('http://localhost:3000/api/usuarios/rolRutas', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Obtener la ruta devuelta en la respuesta
        const { ruta } = response.data;

        if (ruta) {
          // Redirigir a la ruta obtenida
          navigate(ruta);
        } else {
          throw new Error('No se recibió una ruta válida del servidor.');
        }
      } catch (error) {
        console.error(error.message);
        // Redirigir a la página de inicio de sesión si ocurre un error
        navigate('/inicioSesion');
      }
    };

    verificarRol();
  }, [navigate]);

  // Mostrar un mensaje mientras se realiza la verificación
  return <div>Verificando rol y redirigiendo...</div>;
};

export default VerificarRol;
