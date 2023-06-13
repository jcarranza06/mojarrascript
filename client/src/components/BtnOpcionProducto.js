import React from "react";
import "../stylesheets/VerProducto.css"; // import your navbar styles
//ruta a carpeta de imagenes e iconos 
const iconosFolder = require.context("../Iconos", true)

function BtnOpcionProducto(props){
    return (
        <button className="btnOpcionProducto">
            <img src={iconosFolder(props.img)} alt=""></img>
            <span>{props.text}</span>
        </button>
    );
}

export default BtnOpcionProducto;