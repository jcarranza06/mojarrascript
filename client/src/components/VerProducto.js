import React, { useState, useEffect } from 'react';
import "../stylesheets/VerProducto.css";
import MapContainer from './MapContainer.js';

import DialogListas from './DialogListas';
import Comentarios from './Comentarios';
import BtnOpcionProducto from './BtnOpcionProducto';
import { useAuth0 } from "@auth0/auth0-react";

//ruta a carpeta de imagenes e iconos 
//const iconosFolder = require.context("../Iconos", true)

// buttons: guarda botones para opciones de ver producto

const buttons = [
    {
        img: "./pngwing 2.svg",
        text: "Agregar a lista de Compras",
        function: 0
    },
    {
        img: "./Star 1.svg",
        text: "Agregar a historial",
        function: 1
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
    const { isAuthenticated, user, loginWithRedirect } = useAuth0()
    const params = new URLSearchParams(window.location.search);
    const id = params.get('idProducto'); // "123"
    const [userId, setUserId] = useState(0)
    if (isAuthenticated) { console.log(user) }
    const [isDialog, setIsDialog] = useState(false)
    const [estadoDialog, setEstadoDialog] = useState(false)
    const changeEstadoDialog = () => {
        setEstadoDialog(!estadoDialog)
    }
    const [producto, setProducto] = useState([{ "id": 0, "nombre": "", "precio": "", "descuento": null, "descripcion": null, "img": "" }]);
    const [comentariosProducto, setComentariosProducto] = useState([]);
    const [cargaProducto, setCargaProducto] = useState(false);
    function getProducto() {
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/getProductoById?idProducto=" + id;
        let url = new URL(rui);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                console.log('prod', json);
                setProducto(json[0]); // funcion del useState
                setCargaProducto(true);
            });
    }

    const addToHistorialDB = () => {
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/addToHistory?idProducto=" + id + "&idUsuario=" + userId;
        let url = new URL(rui);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                console.log(json);
                //setProducto(json[0]); // funcion del useState
            });
    }


    function getComentariosProducto() {
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/getComentarios/" + id;
        let url = new URL(rui);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                setComentariosProducto(json); // funcion del useState
            });
    }
    function getUserId(user) {
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/getUser?idAuth=" + user.sub + "&name=" + user.name + "&email=" + user.email + "&foto=" + encodeURIComponent(user.picture);
        let url = new URL(rui);
        //console.log('enviadaPeticion', user, url)
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                //console.log("idUsuaro" , json.id)
                setUserId(json.id); // funcion del useState
                setIsDialog(true)

            });
    }

    const addToList = () => {
        //console.log('corriendo add')
        if (isAuthenticated) {
            changeEstadoDialog()
        } else {
            loginWithRedirect()
        };
    }

    const addToHistorial = () => {
        //console.log('corriendo add h')
        if (isAuthenticated) {
            //console.log('corriendo add logueado')
            addToHistorialDB()
        } else {
            loginWithRedirect()
        };
    }

    const switchBtnsFunctions = (i) => {
        if (i === 0) {
            addToList()
        } else if (i == 1) {
            addToHistorial()
        }
    }

    // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, no se debe hacer cada vez que se renderice
    useEffect(() => {
        console.log("auth ", isAuthenticated, user)
        if (isAuthenticated) {
            //console.log('buscandoId')
            getUserId(user)
        };
        getProducto();
        getComentariosProducto();
    }, []);

    return (
        <div className="componentContainer">
            {isDialog && <DialogListas estadoDialog={estadoDialog} changeEstadoDialog={changeEstadoDialog} usuario={userId} producto={id} />}
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
                                producto.descuento != null ? (<p><b>precioAhora: ${producto.descuento}</b></p>) : (<p></p>)
                            }

                        </div>
                        <div className="mapsContainer">
                            {cargaProducto && <MapContainer supermercado={producto.NOMBRESUPERMERCADO}/>}
                        </div>
                        <div className="btnsOptionsVerProducto">
                            {
                                buttons.map((producto, indice) => {
                                    return (
                                        <div key={indice} onClick={() => (switchBtnsFunctions(producto.function))}>
                                            <BtnOpcionProducto text={producto.text} img={producto.img} />
                                        </div>
                                    );
                                })

                            }
                        </div>
                    </div>
                </div>
                <Comentarios productId={id} comments={comentariosProducto} usuario={userId}></Comentarios>
            </div>
        </div>
    );
}

export default VerProducto;