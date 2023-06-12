import React, {useEffect,useState} from 'react';
import { List, NewLista } from './ListasCompras';
    
function CrearLista(props) {
    const [lista, setListas] = useState([]);
    const [idLista, setIdListas] = useState([]);
    let favoritosAgregados=false;
    const userID = 1;
    useEffect(() => {
        let ignore = false;
        async function getListas(){
            const options = {
                method: "GET",
              };
          
              // Petición HTTP, consulta la API y devuelve el cuerpo
              let rui = "http://localhost:5000/getUserListas?idUsuario="+userID;
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
      }, []);

    

    function addListaFavoritos() {
            const data = {
                userId:userID,
                nombreCarrito:"Favoritos"
                
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
            <NewLista listasDB={lista} idListas={idLista}/>
        </>
    );
}

export default CrearLista;
