import React, { useState } from 'react';
import "../stylesheets/Navbar.css"; // import your navbar styles
import '../stylesheets/Perfil.css'
import logo from "../logo.png";
import lapiz from "../Iconos/lapiz.png";
import { useAuth0 } from "@auth0/auth0-react";

function Perfil() {

  const { user, isAuthenticated, loginWithRedirect } = useAuth0()
  /* Boton de Nombre */
  const [mostrarDiv1, setMostrarDiv1] = useState(false);

  const toggleDiv1 = () => {
    setMostrarDiv1(!mostrarDiv1);
  };

  const [nombre, setNombre] = useState('Martin');
  const [nuevoNombre, setNuevoNombre] = useState('');

  const actualizarNombre = () => {
    setNombre(nuevoNombre);
    setNuevoNombre('');
  };

  const handleChange1 = (event) => {
    setNuevoNombre(event.target.value);
  };

  const handleClickNombre = () => {
    toggleDiv1();
    actualizarNombre();
  };

  /* Boton de Direccion */

  const [mostrarDiv2, setMostrarDiv2] = useState(false);

  const toggleDiv2 = () => {
    setMostrarDiv2(!mostrarDiv2);
  };

  const [direccion, setDireccion] = useState('cra 68 # 102 -59');
  const [nuevaDireccion, setNuevaDireccion] = useState('');

  const actualizarDireccion = () => {
    setDireccion(nuevaDireccion);
    setNuevaDireccion('');
  };

  const handleChange2 = (event) => {
    setNuevaDireccion(event.target.value);
  };

  const handleClickDireccion = () => {
    toggleDiv2();
    actualizarDireccion();
  };

  /* Boton de Ciudad */

  const [mostrarDiv3, setMostrarDiv3] = useState(false);

  const toggleDiv3 = () => {
    setMostrarDiv3(!mostrarDiv3);
  };

  const [ciudad, setCiudad] = useState('Bogotá');
  const [nuevaCiudad, setNuevaCiudad] = useState('');

  const actualizarCiudad = () => {
    setCiudad(nuevaCiudad);
    setNuevaCiudad('');
  };

  const handleChange3 = (event) => {
    setNuevaCiudad(event.target.value);
  };

  const handleClickCiudad = () => {
    toggleDiv3();
    actualizarCiudad();
  };

  /* Boton de Departamento */

  const [mostrarDiv4, setMostrarDiv4] = useState(false);

  const toggleDiv4 = () => {
    setMostrarDiv4(!mostrarDiv4);
  };

  const [departamento, setDepartamento] = useState('Cundinamarca');
  const [nuevoDepartamento, setNuevoDepartamento] = useState('');

  const actualizarDepartamento = () => {
    setDepartamento(nuevoDepartamento);
    setNuevoDepartamento('');
  };

  const handleChange4 = (event) => {
    setNuevoDepartamento(event.target.value);
  };

  const handleClickDepartamento = () => {
    toggleDiv4();
    actualizarDepartamento();
  };

  return (
    <>
      {isAuthenticated ? (<div className='Perfil'>
        <h1>Perfil y visivilidad</h1>
        <p>Administra tu información personal y controla a qué información pueden acceder otras personas y aplicaciones.</p>
        <p><a href='#' className='btn1'>Más información acerca del perfil y la visivilidad</a> o <a href='#' className='btn2'>ver nuestra poltica de privacidad</a>.</p>
        <h2>Foto de perfil e imagen de encabezado</h2>
        <div className='fotoPortada'>
          <a href='#'>
            <div className='fotoPerfil'>
              <img src={user.picture} alt="Logo" width='125px' height='125px' />
            </div>
          </a>
        </div>
        <h2>Acerca de ti</h2>
        <div className='infoPerfil'>
          <p>Nombre completo</p>
          <div className='Nombre'>
            <p>{user.name}</p>
            <button className='editarNombre' onClick={toggleDiv1}><img src={lapiz} alt="lapiz" width='15px' height='15px' /></button>
            {mostrarDiv1 && (
              <div className='showhide1'>
                <input
                  className='cambioNombre'
                  type="text"
                  placeholder="Nombre"
                  value={nuevoNombre}
                  onChange={handleChange1}
                  name='texto' />
                <button className='guardarNombre' onClick={handleClickNombre}>Guardar</button>
              </div>
            )}
          </div>
          <p>Dirección</p>
          <div className='Direccion'>
            <p>{direccion}</p>
            <button className='editarDireccion' onClick={toggleDiv2}><img src={lapiz} alt="lapiz" width='15px' height='15px' /></button>
            {mostrarDiv2 && (
              <div className='showhide2'>
                <input
                  className='cambioDireccion'
                  type="text"
                  placeholder="Direccion"
                  value={nuevaDireccion}
                  onChange={handleChange2}
                  name='texto' />
                <button className='guardarDireccion' onClick={handleClickDireccion}>Guardar</button>
              </div>
            )}
          </div>
          <p>Ciudad</p>
          <div className='Ciudad'>
            <p>{ciudad}</p>
            <button className='editarCiudad' onClick={toggleDiv3}><img src={lapiz} alt="lapiz" width='15px' height='15px' /></button>
            {mostrarDiv3 && (
              <div className='showhide3'>
                <input
                  className='cambioCiudad'
                  type="text"
                  placeholder="Ciudad"
                  value={nuevaCiudad}
                  onChange={handleChange3}
                  name='texto' />
                <button className='guardarCiudad' onClick={handleClickCiudad}>Guardar</button>
              </div>
            )}
          </div>
          <p>Departamento</p>
          <div className='Departamento'>
            <p>{departamento}</p>
            <button className='editarDepartamento' onClick={toggleDiv4}><img src={lapiz} alt="lapiz" width='15px' height='15px' /></button>
            {mostrarDiv4 && (
              <div className='showhide4'>
                <input
                  className='cambioDepartamento'
                  type="text"
                  placeholder="Departamento"
                  value={nuevoDepartamento}
                  onChange={handleChange4}
                  name='texto' />
                <button className='guardarDepartamento' onClick={handleClickDepartamento}>Guardar</button>
              </div>
            )}
          </div>
        </div>
      </div>
      ) : (loginWithRedirect()
      )}

    </>
  );
}

export default Perfil;