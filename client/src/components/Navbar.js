import React, {useState} from "react";
import "../stylesheets/Navbar.css"; // import your navbar styles
import logo from "../Logo.svg";
import carrito from "../Iconos/Icons/carrito_compras.svg";
import menuHam from "../Iconos/Icons/menu_hamburguesa.svg";
import usuarioImg from "../Iconos/Icons/usuario.svg";
import { Outlet, Link } from "react-router-dom";

const baseURL = 'http://localhost:3000/';

function Navbar() {

  // Hook para manejar el click del menu hamburguesa
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  }

  // Hook para el manejo del click de ver perfil
  const [clickedPerfil, setClickedPerfil] = useState(false);
  const handleClickPerfil = () => {
    setClickedPerfil(!clickedPerfil);
  }

  if(clicked===true && clickedPerfil===true){
    setClickedPerfil(!clickedPerfil);
    setClicked(!clicked);
  }
  

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
  //console.log(userId,userName,userEmail,userPicture);
  // se crea variable para la busqueda del input de navbar 
  const [busqueda, setBusqueda] = useState("")

  // funcion que detecta Intro en el input 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') { 
      // 👇 Get input value
      console.log(busqueda);
      window.location.href = baseURL + 'preproducto?search='+busqueda;
    }
  };

  // funcion que actualiza la variable busqueda cuando se escribe en el input 
  const handleChange = event => {
    setBusqueda(event.target.value)
  }

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      {/* MENU HAMBURGUESA */}
      <div onClick={handleClick} className="navbar-menu">
        <img src={menuHam} alt="menu hamburguesa" />
      </div>
      <div className="textCategorias">Categorías</div>
      <div className={`categorias ${clicked ? 'active' : '' }`}>
          <ul><Link to="/nuevaLista">Lista de compras</Link></ul>
          <ul>Historial</ul>
          <hr></hr>
          <li> Mercado </li>
          <li> Lacteos </li>
          <li> Despensa </li>
          <li> Frutas y verduras </li>
          <li> Licores </li>
          <li> Bebidas </li>
          <li> Panaderia </li>
          <li> Carnes </li>
      </div>
      <div className={`bgMenu ${clicked ? 'active' : '' }`}></div>

      {/* SEARCH */}
      <div className="navbar-search">
        <input type="text" placeholder="¿Qué estas buscando?" onKeyDown={handleKeyDown} value={name} onChange={handleChange}/>
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


      {/* FRAGMENTO DE CODIGO: VERIFICA SI EL USUARIO ESTA REGISTRADO PARA PONER LA IMAGEN DE ÉL O NO */}
      {userName === null ? ( <div> <img src={ userPicture } alt=""  /> </div> ) : ( 

      <div className="userPicture"> 
        {/*se borran atributos clickedPerfil y handleClickPerfil por no hacer nada 
        <img clickedPerfil={clickedPerfil} handleClickPerfil={handleClickPerfil} onClick={handleClickPerfil} width='50em' src={userPicture} alt="imagen del usuario"/> */}
        <img onClick={handleClickPerfil} width='50em' src={userPicture} alt="imagen del usuario"/>
        <div className={`perfil ${clickedPerfil ? 'active' : '' }`}>
          <ul> <Link to="/perfil">Modificar cuenta</Link></ul>
          <ul>Ajustes</ul>
        </div>

      </div> )}
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
