import React, { useState, useEffect } from 'react';
import "../stylesheets/VerProducto.css";


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
                            <iframe
                                title="Ubicacion de usuario"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.54949968614653!2d-74.08205488257842!3d4.631165082134345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bd4d69adbbb%3A0x43b3f4913d00eb9a!2sPUNTO%202!5e0!3m2!1ses!2sco!4v1681592970729!5m2!1ses!2sco"
                                style={{ width: '100%', height: 'auto', border: '0' }} allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
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