import React, { useEffect, useState } from 'react';
import { List, NewLista } from './ListasCompras';
import { useAuth0 } from "@auth0/auth0-react";

function CrearLista(props) {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0()
    const [lista, setListas] = useState([]);
    const [idLista, setIdListas] = useState([]);
    const [userID, setUserID] = useState(0)
    let favoritosAgregados = false;

    function getUserId(user) {
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/getUser?idAuth=" + user.sub + "&name=" + user.name + "&email=" + user.email;
        let url = new URL(rui);
        //console.log('enviadaPeticion', user, url)
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                //console.log("idUsuaro" , json.id)
                setUserID(json.id); // funcion del useState
                getListas(json.id);
            });
    }

    const getListas = (userID) => {
        let ignore = false;
        async function getListas() {
            const options = {
                method: "GET",
            };

            // Petición HTTP, consulta la API y devuelve el cuerpo
            let rui = "http://localhost:5000/getUserListas?idUsuario=" + userID;
            let url = new URL(rui);
            fetch(url, options) // se hace la consulta 
                .then(response => response.text()) // se obtiene el cuerpo de la respuesta
                .then(data => {
                    const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                    console.log(json);
                    const nombresListas = json.map(json => json.NOMBRECARRITO);

                    setListas(nombresListas);
                    const ids = json.map(json => json.IDCARRITO);

                    setIdListas(ids);
                    if (!ignore && nombresListas.length === 0) {
                        addListaFavoritos();
                        //   setListas(["Favoritos"]);
                        getListas()
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener las listas:", error);
                });
        }
        getListas();
        return () => {
            ignore = true;
        };
    }

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect()
        } else {
            getUserId(user)
        }

    }, []);



    function addListaFavoritos() {
        const data = {
            userId: userID,
            nombreCarrito: "Favoritos"

        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        // Petición HTTP, consulta api y devuelve el body 
        //let url = new URL("http://localhost:5000/uploadProducts?productsJson=" + busqueda);
        let url = new URL("http://localhost:5000/crearLista");
        console.log(url);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript

                console.log(json);
            });
    }
    return (
        <>
            <List />
            <NewLista listasDB={lista} idListas={idLista} userID={userID}/>
        </>
    );
}

export default CrearLista;
