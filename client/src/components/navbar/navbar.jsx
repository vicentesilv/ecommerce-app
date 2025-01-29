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
                        <li><Link  className="link" to="/productos">productos</Link></li>
                        {localStorage.getItem('rol') === 'admin'? <li><Link className="link" to="/adminUsuarios">panel de Usuarios</Link></li>: null}
                        {localStorage.getItem('rol') === 'vendedor'? <li><Link className="link" to="/adminProductos">panel de Productos</Link></li>: null}
                        <li><Link  className="link" to="/carrito">carrito</Link></li>
                        <li><Link  className="link" to="/pedidos">mis pedidos</Link></li>
                        <li><Link className="link"  to="/miPerfil">mi perfil</Link></li>
                        <li><Link  className="link linkfinal" to="/cerrarSesion">cerrar sesion</Link></li>
                </ul>
               </div>

            </nav>
        </div>
    )
}

export default Navbar;