// le agregué hooks useState y useEffect
import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer.js';

import "../stylesheets/Home.css"; // import your navbar styles
import prev from "../Iconos/Icons/prev.png";
import next from "../Iconos/Icons/next.png";
import CardProducto from './CardProducto.js';
/*import {
    useNavigate
} from "react-router-dom";*/

const iconosFolder = require.context("../Iconos", true)

const iconos = [
    {
        name: 'Mercado',
        img: './image 134.svg'
    },
    {
        name: 'Lacteos',
        img: './leche.png'
    },
    {
        name: 'Despensa',
        img: './despensa.png'
    },
    {
        name: 'Frutas y verduras',
        img: './tomate.png'
    },
    {
        name: 'Licores',
        img: './licor.png'
    },
    {
        name: 'Bebidas',
        img: './bebida.png'
    },
    {
        name: 'Panaderia',
        img: './pan.png'
    },
    {
        name: 'Carnes',
        img: './carne.png'
    },

];

//getProductosEnOferta();

function addStylesheet(url) {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

function Home() {

    // PRODUCTOS EN OFERTA
    const [productosEnOferta, setProductosEnOferta] = useState([]);
    function getProductosEnOferta() {
        // configuracion para la petición
        const options = {
            method: "GET"
        };


        // Petición HTTP, consulta api y devuelve el body 
        let url = new URL("http://localhost:5000/getProductosEnOferta");
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                console.log(json);
                setProductosEnOferta(json); // funcion del useState
            });
    }

    // PRODUCTOS MÁS VENDIDOS
    const [productosMasVendidos, setProductosMasVendidos] = useState([]);
    function getProductosMasVendidos() {
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let url = new URL("http://localhost:5000/getProductosMasVendidos");
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                console.log(json);
                setProductosMasVendidos(json); // funcion del useState
            });
    }

    // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, no se debe hacer cada vez que se renderice
    useEffect(() => {
        
        getProductosEnOferta();
    }, []);
    //setProductosEnOferta(prods);

    useEffect(() => {
        getProductosMasVendidos();
    }, []);


    const [scrollAmount, setScrollAmount] = useState(-700);

    const handleScroll = (scrollOffset) => {
        const container = document.querySelector('.horizontalCardContainer.mas');
        const newScrollAmount = scrollAmount + scrollOffset;
        container.scrollLeft = newScrollAmount;
        setScrollAmount(newScrollAmount);

    };

    //const navigate = useNavigate();

    /*const toProducto = (id) => {
        navigate('/producto', { state: { idProducto: id } });
    }*/

    return (
        <div className="home">
            {addStylesheet("https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap")}
            <div className="contenido">
                <div className="horizontalCardContainer" >

                    {
                        iconos.map((icono, indice) => {
                            return (
                                <div className="card seccionButton" key={indice}>
                                    <img src={iconosFolder(icono.img)} alt=""></img>
                                    <p>{icono.name}</p>
                                </div>
                            );
                        })
                    }
                </div>

                <div className="row-inline-2">
                    <div className="map">
                        <MapContainer />
                    </div>
                    <div className="rowElementContainer">
                        <h1>Busca Productos cerca de ti</h1>
                        <div>
                            <input className='inputProductosCerca' type="text" placeholder="       ¿Qué lugar estás buscando?" id="name" name="name" required minLength="4" maxLength="8" size="auto"></input>
                        </div>

                        <h1>Lo más comprado</h1>
                        <div className='productosMasComprados'>
                            <img onClick={() => handleScroll(-300)} className='imagenPrev' src={prev} alt="flecha correr hacia atras" width="20rem" height="20rem" />
                            <div className="horizontalCardContainer mas" style={{ overflowX: 'scroll'}}>
                                {
                                    (productosMasVendidos === 0 ? (
                                        <p>Cargando ...</p> // en caso que no haya cargado 
                                    ) : (
                                        productosMasVendidos.map((producto, indice) => // se recorre el arreglo para mostrar los elementos
                                        (
                                            <CardProducto key={indice} producto={producto} />    
                                        )
                                        )
                                    ))
                                }
                            </div>
                            <img onClick={() => handleScroll(300)} className='imagenPrev' src={next} alt="flecha correr hacia adelante" width="20rem" height="20rem" />
                        </div>
                    </div>
                </div>
                <h1>Ofertas</h1>
                <div className="horizontalCardContainerOfertas">
                    {
                        (productosEnOferta === 0 ? (
                            <p>Cargando ...</p> // en caso que no haya cargado 
                        ) : (
                            productosEnOferta.map((producto, indice) => // se recorre el arreglo para mostrar los elementos
                            (
                                <CardProducto key={indice} producto={producto} />
                            )
                            )
                        ))
                    }
                </div>
            </div>
        </div>

    );
}

export default Home;
