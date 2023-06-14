import React, { useState, useEffect } from 'react';
import "../stylesheets/Navbar.css"; // import your navbar styles
import '../stylesheets/PreProducto.css'
import CardProductoBusqueda from './CardProductoBusqueda';


function PreProducto() {
  //
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search'); // "123"
  console.log(search);
  const [productos, setProductos] = useState([]);
  // se crea variable para la busqueda del input de navbar 
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [opcionesOrden, setopcionesOrden] = useState(['main', '', '']);
  const [selecOrden, setSelectOrden] = useState(0);
  function getSearching(filtrar) {
    const options = {
      method: "GET"
    };
    
    // Petición HTTP, consulta api y devuelve el body 
    let url = new URL("http://localhost:5000/searchProduct?search=" + search+"&filtrar="+filtrar+"&min="+minPrice+"&max="+maxPrice+"&order="+selecOrden);
    console.log(url);
    fetch(url, options) // se hace la consulta 
      .then(response => response.text()) // se obtiene el cuerpo de la respuesta
      .then(data => {
        const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
        console.log(json);
        setProductos(json); // funcion del useState
      });
  }

  useEffect(() => {
    getSearching(0);
  }, []);

  // funcion que detecta Intro en el input 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      filtrarBusqueda(1);
    }
  };

  // funcion que actualiza la variable busqueda cuando se escribe en el input 
  const handleChangeMin = event => {
    setMinPrice(event.target.value)
  }
  const handleChangeMax = event => {
    setMaxPrice(event.target.value)
  }

  const filtrarBusqueda = (event) => {
    if (minPrice!== "" && maxPrice!== "") {
      // 👇 Get input value
      console.log(minPrice + " - - " + maxPrice);
      getSearching(1);
    }
  };

  const chooseOrden = (int) => {
    setSelectOrden(int);
    if(int === 0){
      setopcionesOrden(['main', '', '']);
    }else if (int===1){
      setopcionesOrden(['', 'main', '']);
    }else {
      setopcionesOrden(['', '', 'main']);
    }
  };

  return (
    <>
      <div className='filtroBusquedaContainer'>
        <h2>Filtar por Rango de Precio</h2>
        <div className='filtroBusqueda'>
          Minimo <input type="number" placeholder="0" onKeyDown={handleKeyDown} value={minPrice} onChange={handleChangeMin} />
          Maximo <input type="number" placeholder="5000" onKeyDown={handleKeyDown} value={maxPrice} onChange={handleChangeMax} />
        </div>
        <div className='filtrarOrden'>
          <div>Ordenar por:</div>
          <div className={'optionOrdenFiltro '+opcionesOrden[0]} onClick={()=>chooseOrden(0)}>Ninguno</div>
          <div className={'optionOrdenFiltro '+opcionesOrden[1]} onClick={()=>chooseOrden(1)}>Mayor precio</div>
          <div className={'optionOrdenFiltro '+opcionesOrden[2]} onClick={()=>chooseOrden(2)}>Menor precio</div>
        </div>
        <div>
          <button onClick={() => filtrarBusqueda()}>Filtrar</button>
        </div>
      </div>

      <div className='productos'>
        {productos.map((producto, indice) => // se recorre el arreglo para mostrar los elementos
        (
          <CardProductoBusqueda key={indice} producto={producto} />
        )
        )}

      </div>
    </>
  );
}

export default PreProducto;