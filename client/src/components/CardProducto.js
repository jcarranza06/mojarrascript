import React from 'react'
import "../stylesheets/Home.css"; // import your navbar styles
import {
    Link
} from "react-router-dom";

function CardProducto(props) {
    return (
        <Link to={{ pathname: '/producto', search: ('?idProducto=' + props.producto.id) }} >
            <div className="card producto" key={props.indice}>
                <img src={props.producto.imagen} alt=""></img>
                {props.producto.nombre}

                <img src={props.producto.imagenSupermercado} style={{ maxHeight:'40px'}}></img>
                <button>
                    $ {props.producto.precio}
                </button>
            </div>
        </Link>

    );
}

export default CardProducto;
