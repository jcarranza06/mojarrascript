import React, { useState, useEffect } from 'react';
import "../stylesheets/ListasCompras.css"; // import your ListasCompras styles
import { Link } from 'react-router-dom';
export function List() {
    return (
        <list className="List">
            <div className='textgrande'>Listas de Compras</div>
            <div className='text'>Crea tu propia lista de compras para que conozcas en qué almacén tendrás un mayor ahorro en tus próximas compras.</div>
            <div className='Listas'>
            </div>
        </list>
    )
}

export function NewLista({ listasDB, idListas, userID }) {
    const [nuevaLista, setNuevaLista] = useState('');
    const [eliminarActivado, setEliminarActivado] = useState(false);
    const [listas, setListas] = useState([]);
    const [ids, setIds] = useState([]);

    useEffect(() => {
        setListas(listasDB);
        setIds(idListas);
    }, [listasDB, idListas]);

    const addListaComprasDB = (userId, nombreCarrito) => {
        const data = {
            userId: userID,
            nombreCarrito: nombreCarrito
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/crearLista";
        let url = new URL(rui);
        console.log('enviadaPeticion', url)
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = data;// se pasa la respuesta de string json a objeto de javascript
                console.log("agregado a listas", json)
                //alert('lista crea');
                setIds([...ids, Number(json.inesertId)]);
            });
    }

    const deleteListaComprasDB = (idCarrito) => {
        const options = {
            method: 'DELETE'
        }
        console.log(idCarrito)
        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/eliminarLista/"+idCarrito;
        let url = new URL(rui);
        console.log('enviadaPeticion', url)
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = data;// se pasa la respuesta de string json a objeto de javascript
                console.log("borrado de listas", json)
                //alert('lista crea');
            });
    }

    function crearListaDeCompras() {
        if (nuevaLista.trim() !== '') {
            addListaComprasDB(userID, nuevaLista);
            setListas([...listas, nuevaLista]);
            setNuevaLista('');
        }
    }

    function handleInputChange(event) {
        setNuevaLista(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            crearListaDeCompras();
        }
    }

    function eliminarListaDeCompras(index) {
        console.log(index)
        if (eliminarActivado && index !== 0) {
            deleteListaComprasDB(ids[index]);
            const nuevasListas = listas.filter((_, i) => i !== index);
            setListas(nuevasListas);
            const nuevasListasIds = ids.filter((_, i) => i !== index);
            setIds(nuevasListasIds);
            setEliminarActivado(false);
        }
    }

    return (
        <div className="new-lista-container">
            <ul className="lista-compras">

                {listas.map((lista, index) => (
                    <li key={index} >
                        <Link to={eliminarActivado ? '/nuevaLista':`/listas/${ids[index]}/${lista}`} onClick={() => eliminarListaDeCompras(index)}>
                            {lista}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="input-container">
                <button className="boton-crear" onClick={crearListaDeCompras}>
                    Crear nueva lista de compras
                </button>

                <input
                    type="text"
                    value={nuevaLista}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className={`boton-eliminar${eliminarActivado ? ' activado' : ''}`}
                    onClick={() => setEliminarActivado(!eliminarActivado)}
                >
                    Eliminar lista de compras
                </button>

            </div>

        </div>
    );
}

export default List;