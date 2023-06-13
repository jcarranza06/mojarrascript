import React from 'react'
import { Link } from "react-router-dom";

function CardProductoBusqueda(props) {
    return (
        <Link to={{ pathname: '/producto', search: ('?idProducto=' + props.producto.IDPRODUCTO) }} >
            <div className='producto'>
                <div href='#'>
                    <div className='productoIMG'>
                        <img src={props.producto.img} alt='img-producto' />
                    </div>
                </div>
                <div className='productoInfo'>
                    <h1> {props.producto.name}</h1>
                    
                </div>
                <div className='cadenaIMG'>
                    <img src={props.producto.imagenSupermercado} style={{ maxHeight:'40px'}}></img>
                </div>
                <div className='buttom'>
                    <a href='#' className='btn'>$ {props.producto.precio}</a>
                </div>
            </div>
        </Link>
    );
}

export default CardProductoBusqueda;