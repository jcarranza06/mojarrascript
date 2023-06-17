import React, { useState, useEffect } from "react";

import "../stylesheets/VerProducto.css"; // import your navbar styles
import Comentario from "./Comentario";
import { useAuth0 } from "@auth0/auth0-react";
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
    const { isAuthenticated,user,loginWithRedirect } =  useAuth0()
    const [userId, setUserId]= useState(0)
    const [comentarioEscrito, setComentarioEscrito] = useState("")
    const [comments, setComments]=useState(props.comments);

    useEffect(() => {
        setComments(props.comments)
    }, [props.comments]);

    //console.log('com ',comments, props.comments)
    const handleChange = event => {
        setComentarioEscrito(event.target.value)
    }

    function getUserId(user) {
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/getUser?idAuth="+user.sub+"&name="+user.name+"&email="+user.email+"&foto="+encodeURIComponent(user.picture);
        //console.log(rui)
        let url = new URL(rui);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                //console.log(json.id);
                setUserId(json.id); // funcion del useState
                //console.log('puesto '+ userId)
                sendRequestAddComment(json.id);
            });
    }

    function sendRequestAddComment(userId){
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/comentarios?userId="+userId+"&productId="+props.productId+"&comentario="+comentarioEscrito;
        //console.log(rui)
        let url = new URL(rui);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                //console.log('comentarios',json);
                //alert(json)
                setComments([...comments, {COMENTARIO:comentarioEscrito, FECHACOMENTARIO:null,FOTOUSUARIO:user.picture, NOMBREUSUARIO:user.name}])
                setComentarioEscrito('');
            });
    }

    function sendComentario(){
        //console.log(comentarioEscrito)
        if(isAuthenticated){getUserId(user)}
        else(loginWithRedirect());

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
                        comments.map((comment, indice) => {
                            return (
                                /*<div key={indice}>
                                    {comment}
                                </div>*/
                                <Comentario key={indice} comment={comment}></Comentario>
                            );
                        })
                    }

                </div>
                <div>
                    {
                        //formulario para subir comentario
                    }
                    <h3>Agregar Comentario </h3>
                    <textarea className="comentarioWRiting" type="text" id="name" name="name" value={comentarioEscrito} required onChange={handleChange}/>
                    <div><button onClick={() => (sendComentario())}>subir</button></div>
                </div>
            </div>
        </div>
    );
}

export default Comentarios;