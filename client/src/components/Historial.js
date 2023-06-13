import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import "../stylesheets/Historial.css";
function Historial() {
  // Lógica para obtener los productos de la lista con el ID `listaId`
  // Puedes utilizar el ID para hacer una solicitud a la API o buscar los productos en alguna fuente de datos
  const {nombreLista}  = useParams();
  const {id}  = useParams();
  //let id  = 35;
  const [producto, setProducto] = useState([{"CANTIDAD":0,"IDPRODUCTO":0,"NOMBREPRODUCTO":"","PRECIOPRODUCTO":"","LOGOSUPERMERCADO":""}]);
  let PrecioTotal=0;
  let ahorroTotal=0;
  useEffect(() => {
    
    getProductos();  
    
  }, []);
  function getProductos(){
    const options = {
        method: "GET",
      };
  
      // Petición HTTP, consulta la API y devuelve el cuerpo
      let rui = "http://localhost:5000/getProductosFromUserHistory?idUsuario="+id;
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
          console.error("Error al obtener historial:", error);
        });
}
  return (
    <div className='contenedor-historial'>
      <h2 className='titulo-historial'>Historial de compras<span> {nombreLista}</span></h2>
      <p className='titulo-descripcion'> Visualiza todos los productos que has comprado en tus almacenes favoritos con la ayuda de Mojarra Price para 
      encontrar el mejor precio en cada uno de tus productos, conoce igualmente el ahorro total que has tenido en cada uno de tus productos.</p>
      <div className='productos-grid' >
        {producto.map((product) => {
          let precio = Number(product.PRECIOPRODUCTO);
          let precioSinDecimales = parseInt(precio.toFixed(2));
          PrecioTotal+=precioSinDecimales;
          let cantidad = Number(product.CANTIDAD);
          if (cantidad<2) {
            return(
                <div key={product.id} className ='producto-card' >
                  <p className ='varios'>x{cantidad}</p>
                  <p className='nombre-producto'>{product.NOMBREPRODUCTO}</p>
                  <div className='contenedor-precio-logo'>
                    <p className='precio'> $ {precioSinDecimales}</p>
                    <img src={product.LOGOSUPERMERCADO} alt="Logo supermercado" />
                  </div>
                </div>
              );
          } else{
            return(
                <div key={product.id} className ='producto-card' >
                  <p className='nombre-producto'>{product.NOMBREPRODUCTO}</p>
                  <div className='contenedor-precio-logo'>
                    <p className='precio'> $ {precioSinDecimales}</p>
                    <img src={product.LOGOSUPERMERCADO} alt="Logo supermercado" />
                  </div>
                </div>
              );
          }          
        })}
      </div>
      <div className='linea'/>
      <div className='totales'>
        <div>Total gastado: <span className='precio'>$ {PrecioTotal}</span> </div>
        <div className='ahorro'>Ahorro Total: <span className='ahorro-total'>${ahorroTotal}</span></div>
        <p></p>
      </div>
    </div>
  );
}

export default Historial;
