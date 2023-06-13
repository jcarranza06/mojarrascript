import React from "react";

import "../stylesheets/VerProducto.css"; // import your navbar styles
const iconosFolder = require.context("../Iconos", true)

function Comentario(props) {
    return (
        <div className="comentario">
            <div className="comentarioImg">
                <img src={props.comment.FOTOUSUARIO} alt="imagen producto"></img>
            </div>
            <div style={{width: '100%'}}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                    <div>{props.comment.NOMBREUSUARIO}</div>
                    <div>{props.comment.FECHACOMENTARIO}</div>
                </div>
                <div className="comentarioStr">
                    {props.comment.COMENTARIO}
                </div>
            </div>

        </div>
    );
}

export default Comentario;