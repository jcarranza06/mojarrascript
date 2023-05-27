import React from "react";

import "../stylesheets/VerProducto.css"; // import your navbar styles
import Comentario from "./Comentario";

const comments = [
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
]

function Comentarios(props) {
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
                                <Comentario key={indice} text={comment.comment} img={comment.img}></Comentario>
                            );
                        })
                    }

                </div>
                <div>
                    {
                        //formulario para subir comentario
                    }
                    <h3>Agregar Comentario </h3>
                    <textarea className="comentarioWRiting" type="text" id="name" name="name" required />
                    <div><button>subir</button></div>
                </div>
            </div>
        </div>
    );
}

export default Comentarios;