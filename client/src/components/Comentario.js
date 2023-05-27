import React from "react";

import "../stylesheets/VerProducto.css"; // import your navbar styles
const iconosFolder = require.context("../Iconos", true)

function Comentario(props) {
    return (
        <div className="comentario">
            <div className="comentarioImg">
            <img src={iconosFolder(props.img)} alt="imagen producto"></img>
            </div>
            <div className="comentarioStr">
                {props.text}
            </div>
        </div>
    );
}

export default Comentario;