import React, { useState, useEffect } from 'react';
import "../stylesheets/DialogListas.css";

function DialogListas(props) {
    const listas = [
        { nombre: 'lista 1', id: 1 },
        { nombre: 'lista 2', id: 2 }
    ]
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [dialogStatus, setDialogStatus] = useState(true);
    const [listasUsuario, setListasUsuario] = useState([]);
    const cerrarDialog = () => {
        setDialogStatus(false)
    }
    const handleInputChange = (event) => {
        setOpcionSeleccionada(event.target.value);
    };

    const addElementoToList = () => {
        console.log(Number(opcionSeleccionada.replace(/"/g, '')))
        console.log(props.producto)
        addElementoToListBD(Number(opcionSeleccionada.replace(/"/g, '')), props.producto)
    }

    const addElementoToListBD = (carritoId, productoId) => {
        const data = {
            carritoId:carritoId,
            productoId:Number(productoId.replace(/"/g, ''))
        }
        console.log(data)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/insertarProducto";
        let url = new URL(rui);
        console.log('enviadaPeticion', url)
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = data;// se pasa la respuesta de string json a objeto de javascript
                console.log("agregado a listas", json)
                alert(json);
            });
    }

    function getUserLists() {
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/getUserListas?idUsuario=" + props.usuario;
        let url = new URL(rui);
        console.log('enviadaPeticion', url)
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                console.log("listas", json)
                setListasUsuario(json); // funcion del useState
            });
    }

    useEffect(() => {
        console.log("entrando dialog ", props.usuario)
        if (props.usuario) { getUserLists() }
        else (console.log('nohay usuario'))
    }, []);

    return (
        <div>
            <dialog open={props.estadoDialog}>
                <div className='cuadro'>
                    {
                        listasUsuario.map((lista, indice) => {
                            return (
                                <div key={indice}>
                                    <label>
                                        <span>{lista.NOMBRECARRITO}</span>
                                        <input type="radio" value={'"'+lista.IDCARRITO+'"'} checked={opcionSeleccionada === '"'+lista.IDCARRITO+'"'} onChange={handleInputChange} />
                                    </label>
                                </div>
                            );
                        })

                    }
                </div>
                <div>
                    <button onClick={() =>(addElementoToList())}>
                        Agregar
                    </button>
                    <button onClick={() => (props.changeEstadoDialog())}>
                        Cerrar
                    </button>
                </div>
            </dialog>
        </div>
    );
}

export default DialogListas;