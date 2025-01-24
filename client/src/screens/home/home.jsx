import { Outlet, Link } from "react-router-dom";

import "./home.css"; 
import assets from "../../assets/imagenes";


function Home() {
  return (
    <div className="contenedor">
      <div class="slider-container">
        <div class="slider-viewport">
          <div class="slide" id="slide1">
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <hr />
            <h1>¿Quieres vender o comprar?</h1>
            <div className="texto">
              <p>
                somo una aplicacion que permite encontrar,comprar y vender
                articulos de diferentes categorias y usuarios
              </p>
            </div>
            <img src={assets.persona1} className="persona1" alt="" />
            <a href="#slide2" className="siguiente" onClick={(e) => {
                const persona = document.querySelector(".persona1");
                const persona2 = document.querySelector(".persona2");
                const persona3 = document.querySelector(".persona3");
                const flechaant = document.querySelector(".anterior");
                const flecha = document.querySelector(".siguiente");
                flecha.style.display = "none";
                persona.style.display = "none";
                persona2.style.display = "block";
                persona3.style.display = "block";
                flechaant.style.display = "block";
              
                
              }}
            >
              <img src={assets["arrow-right"]} className="siguiente" alt="" />
            </a>
          </div>
          <div class="slide" id="slide2">
            <div className="contenido">
              <span>.</span>
              <span>.</span>
              <span>.</span>
              <hr />
              <h1>¿Como empezar?</h1>
              <div className="botones">
                <Link to="/inicioSesion" className="boton">
                  Iniciar sesion
                </Link>
                <Link to="/registro" className="boton">
                  Registrarse
                </Link>
              </div>
              <img src={assets.persona2} className="persona2" alt="" />
              <img src={assets.persona3} className="persona3" alt="" />
              <a href="#slide1" className="anterior" onClick={() =>{
                    const persona = document.querySelector(".persona1");
                    const persona2 = document.querySelector(".persona2");
                    const persona3 = document.querySelector(".persona3");
                    const flechaant = document.querySelector(".anterior");
                    const flecha = document.querySelector(".siguiente");
                    flecha.style.display = "block";
                    persona.style.display = "block";
                    persona2.style.display = "none";
                    persona3.style.display = "none";
                    flechaant.style.display = "none";
              }}><img src={assets["arrow-left"]}  alt="" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="botones2">
        <a href="#slide1">1</a>
        <a href="#slide2">2</a>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
