import { Outlet, Link } from "react-router-dom";
import './navbar.css';

function Navbar() {
    function toggleMenu() {
                const menu = document.querySelector('.menu');
        menu.classList.toggle('active');
    }

    return (

        
        <div>
            <nav className="navbar">
               <div className="navbar-container">
                    <button onClick={toggleMenu} className="menu-toggle" id="menuToggle"> ☰ </button>
                    <ul className="menu">
                        <li><Link  className="link" to="/">productos</Link></li>
                        {localStorage.getItem('rol') === 'admin'? <li><Link className="link" to="/adminUsuarios">panel de Usuarios</Link></li>: null}
                        {localStorage.getItem('rol') === 'vendedor'? <li><Link className="link" to="/adminProductos">panel de Productos</Link></li>: null}
                        {localStorage.getItem("token") ? (<li><Link className="link" to={`/carrito/${localStorage.getItem('id')}`}>Carrito</Link></li>) : null}
                        {localStorage.getItem("token")?<li><Link  className="link" to="/pedidos">mis pedidos</Link></li>: null}
                        {localStorage.getItem("token")?<li><Link className="link"  to="/miPerfil">mi perfil</Link></li>: null}
                        {localStorage.getItem("token")?<li><Link  className="link linkfinal" to="/cerrarSesion">cerrar sesion</Link></li>: null}
                        {!localStorage.getItem('token')?<li><Link  className="link linkfinal" to="/informacion">que somos</Link></li>: null}
                        {!localStorage.getItem('token')?<li><Link  className="link linkfinal" to="/inicioSesion">inicion de sesion</Link></li>: null}
                        {!localStorage.getItem('token')?<li><Link  className="link linkfinal" to="/registro">registro</Link></li>: null}
                </ul>
               </div>

            </nav>
        </div>
    )
}

export default Navbar;