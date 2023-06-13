import React, { useState, useEffect } from 'react';
import "../stylesheets/VerProducto.css";
import MapContainer from './MapContainer.js';


import Comentarios from './Comentarios';
import BtnOpcionProducto from './BtnOpcionProducto';
import {
    useParams
} from 'react-router-dom';

//ruta a carpeta de imagenes e iconos 
const iconosFolder = require.context("../Iconos", true)

// buttons: guarda botones para opciones de ver producto
const buttons = [
    {
        img: "./pngwing 2.svg",
        text: "Agregar a lista de Compras",
        function: ""
    },
    {
        img: "./Star 1.svg",
        text: "Agregar a Favoritos",
        function: ""
    }
]

/*fetch("")
//.then((response) => response.json())
  .then(function(response) {
    console.log(response);
  });*/

// este producto se debe traer de BD -> getProducto(idProducto)
/*const producto = {
    id: 1,
    nombre: "mojarra sabrosa",
    precioRegular: 5000,
    precioAhora: 400,
    precioPromedio: 300,
    cantidad: "500g",
    descripcion: "esta rica y fresca",
    img: "./image 170.svg"
}*/

function VerProducto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('idProducto'); // "123"
    console.log(id);

    const [producto, setProducto] = useState([{"id":0,"nombre":"","precio":"","descuento":null,"descripcion":null,"img":""}]);
    function getProducto() {
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/getProductoById?idProducto="+id;
        console.log(rui)
        let url = new URL(rui);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                console.log(json);
                setProducto(json[0]); // funcion del useState
            });
    }

    // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, no se debe hacer cada vez que se renderice
    useEffect(() => {
        getProducto();
    }, []);

    return (
        <div className="componentContainer">
            <div className="contenido">
                <div className="row-inline-2">
                    <div className="productImageContainer">
                        <img src={producto.img} alt="imagen producto"></img>
                    </div>
                    <div className="rowElementContainer">
                        <h3>{producto.nombre}</h3>
                        <div>
                            <p>
                                <b>precioRegular: ${producto.precio}</b>
                            </p>
                            {
                                producto.descuento!= null ?(<p><b>precioAhora: ${producto.descuento}</b></p>):(<p></p>)
                            }
                            
                        </div>
                        <div className="mapsContainer">
                            <MapContainer />
                        </div>
                        <div className="btnsOptionsVerProducto">
                            {
                                buttons.map((producto, indice) => {
                                    return (
                                        <div key={indice}>
                                            <BtnOpcionProducto text={producto.text} img={producto.img} />
                                        </div>
                                    );
                                })

                            }
                        </div>
                    </div>
                </div>
                <Comentarios></Comentarios>
            </div>
        </div>
    );
}

export default VerProducto;