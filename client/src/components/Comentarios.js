import React, { useState } from "react";

import "../stylesheets/VerProducto.css"; // import your navbar styles
import Comentario from "./Comentario";

/*const comments = [
    {
        user:"",
        img: "./image 170.svg",
        comment: "no sirve"
    },
    {
        user:"",
        img: "./image 170.svg",
        comment: "cule mojarra sabrosa. Vale la pena completamente"
    }
]*/

function Comentarios(props) {
    const [comentarioEscrito, setComentarioEscrito] = useState("")
    const handleChange = event => {
        setComentarioEscrito(event.target.value)
    }

    function getUserId(){
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/userId";
        let url = new URL(rui);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                console.log('usuario: ',json);
                //setComentariosProducto(json); // funcion del useState
            });
    }

    function sendComentario(){
        console.log(comentarioEscrito)
        getUserId()
    }

    return (
        <div className="comentariosContainer">
            <h2>
                Comentarios
            </h2>
            <div>

                <div>
                    {
                        //mostrar lista de comentarios del producto
                        props.comments.map((comment, indice) => {
                            return (
                                /*<div key={indice}>
                                    {comment}
                                </div>*/
                                <Comentario key={indice} text={comment.COMENTARIO} img={comment.img}></Comentario>
                            );
                        })
                    }

                </div>
                <div>
                    {
                        //formulario para subir comentario
                    }
                    <h3>Agregar Comentario </h3>
                    <textarea className="comentarioWRiting" type="text" id="name" name="name" required onChange={handleChange}/>
                    <div><button onClick={() => (sendComentario())}>subir</button></div>
                </div>
            </div>
        </div>
    );
}

export default Comentarios;