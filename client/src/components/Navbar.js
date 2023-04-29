import React from "react";
import "../stylesheets/Navbar.css"; // import your navbar styles
import logo from "../logo.png";
import carrito from "../Iconos/Icons/carrito_compras.svg";
import menuHam from "../Iconos/Icons/menu_hamburguesa.svg";
import usuarioImg from "../Iconos/Icons/usuario.svg";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-menu">
        <img src={menuHam} alt="menu hamburguesa" />
      </div>
      <div className="textCategorias">Categorías</div>
      <div className="navbar-search">
        <input type="text" placeholder="¿Qué estas buscando?" />
      </div>
      <div className="navbar-login">
        <button
          onClick={() => (window.location.href = "http://localhost:5000/login")}
        >
          Iniciar Sesión
        </button>
      </div>
      <div className="navbar-user">
        <img src={usuarioImg} alt="usuario icono" onClick={() => (window.location.href = "http://localhost:5000/login")}/>
      </div>
      <div className="navbar-carrito">
        <img src={carrito} alt="carrito de compras" />
      </div>

    </nav>
  );
}

export default Navbar;
