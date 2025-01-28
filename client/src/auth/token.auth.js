import axios from "axios";
import { redirect } from "react-router-dom";

function tokenAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debe iniciar sesión para acceder a esta ruta.');
        window.location.href = '/inicioSesion';
        return;
    }

    return token;
}




export default tokenAuth;


