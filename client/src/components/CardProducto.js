import React from 'react'
import "../stylesheets/Home.css"; // import your navbar styles
import {
    Link,
    useNavigate
} from "react-router-dom";

function CardProducto(props) {
    return (
        <Link to={{ pathname: '/producto', search: ('?idProducto=' + props.producto.id) }} >
            <div className="card producto" key={props.indice}>
                <img src={props.producto.imagen} alt=""></img>
                {props.producto.nombre}

                <span>{props.producto.supermercado}</span>

                <button>
                    $ {props.producto.precio}
                </button>
            </div>
        </Link>

    );
}

export default CardProducto;
