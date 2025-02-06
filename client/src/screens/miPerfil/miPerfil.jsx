import Navbar from "../../components/navbar/navbar";
import "./miperfil.css"


const MiPerfil = () => {
    const nombre = localStorage.getItem('nombre');
    const correo = localStorage.getItem('correo');
    const rol = localStorage.getItem('rol');
    const fecha = localStorage.getItem('fecha');

    return (
        <div className="contenedor-miperfil">
            <Navbar />
            <div className="infortmacionPerfil">
                <h1>{nombre}</h1>
                <h2>{correo}</h2>
                <h2>{rol}</h2>
                <h2>fecha de registro: {new Date(fecha).toDateString()}</h2>
            </div>
        </div>
    )
}

export default MiPerfil
