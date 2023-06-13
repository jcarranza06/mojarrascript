import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import "../stylesheets/ListasProducto.css";
function ListaProductos() {
  // Lógica para obtener los productos de la lista con el ID `listaId`
  // Puedes utilizar el ID para hacer una solicitud a la API o buscar los productos en alguna fuente de datos
  const {nombreLista}  = useParams();
  const {id}  = useParams();
  const [producto, setProducto] = useState([{"IDPRODUCTO":0,"NOMBREPRODUCTO":"","PRECIOPRODUCTO":"","LOGOSUPERMERCADO":""}]);
  let PrecioTotal=0;
  let ahorroTotal=0;
  useEffect(() => {
    
    getProductosLista();  
    
  }, []);
  function getProductosLista(){
    const options = {
        method: "GET",
      };
  
      // Petición HTTP, consulta la API y devuelve el cuerpo
      let rui = "http://localhost:5000/getProductosLista?carritoId="+id;
      let url = new URL(rui);
      fetch(url, options) // se hace la consulta 
          .then(response => response.text()) // se obtiene el cuerpo de la respuesta
          .then(data => {
              const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
              console.log(json);
              const producto = json.map(json => json);
              console.log( producto);
              setProducto(producto);
              
          })
        .catch((error) => {
          console.error("Error al obtener las listas:", error);
        });
}
  return (
    <div className='contenedor-lista-productos'>
      <h2 className='titulo-lista-producto'>lista de compras <span> {nombreLista}</span></h2>
      <div className='productos-grid' >
        {producto.map((product) => {
          let precio = Number(product.PRECIOPRODUCTO);
          let precioSinDecimales = parseInt(precio.toFixed(2));
          PrecioTotal+=precioSinDecimales;
          return(
            <div key={product.id} className ='producto-card' >
              <p className='nombre-producto'>{product.NOMBREPRODUCTO}</p>
              <div className='contenedor-precio-logo'>
                <p className='precio'> $ {precioSinDecimales}</p>
                <img src={product.LOGOSUPERMERCADO} alt="Logo supermercado" />
            
              </div>
            </div>
          );
          
        })}
      </div>
      <div className='linea'/>
      <div className='totales'>
        <div>Precio Total: <span className='precio'>$ {PrecioTotal}</span> </div>
        <div className='ahorro'>Ahorro Total: <span className='ahorro-total'>${ahorroTotal}</span></div>
      </div>
      <button className='enviar-button'>
        Enviar Lista a Historial
      </button>
    </div>
  );
}

export default ListaProductos;
