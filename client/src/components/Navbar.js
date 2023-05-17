import React from "react";
import "../stylesheets/Navbar.css"; // import your navbar styles
import logo from "../Logo.svg";
import carrito from "../Iconos/Icons/carrito_compras.svg";
import menuHam from "../Iconos/Icons/menu_hamburguesa.svg";
import usuarioImg from "../Iconos/Icons/usuario.svg";





function Navbar() {


  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  const userName = urlParams.get('userName');
  const userEmail = urlParams.get('userEmail');
  const userPicture = urlParams.get('userPicture');
  let arr;
  let name;
  if(userName !== null){
    arr = userName.split(' ');
    name = arr[0];
  }
  console.log(userId,userName,userEmail,userPicture);

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

      {/* EL SIGUIENTE FRAGMENTO DE CODIGO HACE LO SIGUIENTE */}
      {/* si la variable userName esta vacia, significa que no se ha registrado el usuario, entonces se mostrara el boton de iniciar sesion */}
      {/* en caso de que esta variable tenga algo, entonces el boton se dejara de mostrar */}
      {userName === null ? ( <p className="usuarioText">{ name }</p>) : ( <p className="usuarioText">{ name }</p> )}
      {userName === null && <div className="navbar-login">
        <button
          onClick={() => (window.location.href = "http://localhost:5000/login")}
        >
          Iniciar Sesión
        </button>
      </div> }
      {/* hasta aca va el fragmento de codigo */}


      {userName === null ? ( <div> <img src={ userPicture } alt=""  /> </div> ) : ( <div> <img width='50em' src={userPicture} alt="imagen del usuario"/> </div> )}
      {userName === null && <div className="navbar-user">
        <img src={usuarioImg} alt="usuario icono" onClick={() => (window.location.href = "http://localhost:5000/login")}/>
      </div>}


      <div className="navbar-carrito">
        <img src={carrito} alt="carrito de compras" />
      </div>

    </nav>
  );

}

export default Navbar;
