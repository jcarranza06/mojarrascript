import React from 'react'

import "../stylesheets/Home.css"; // import your navbar styles

const iconosFolder = require.context("../Iconos", true)
const iconos = [ 
    {
        name: 'Mercado',
        img: './image 134.svg'
    },
    {
        name: 'Tecnologia',
        img: './pc 1.svg'
    },
    {
        name: 'Deporte',
        img: './voley 1.svg'
    },
    {
        name: 'Electro y Cocina',
        img: './electro 1.svg'
    },
    {
        name: 'Muebles',
        img: './mueble 1.svg'
    },
    {
        name: 'Bebes y Niños',
        img: './bebe 1.svg'
    },
    {
        name: 'Mascotas',
        img: './perro 1.svg'
    },
    {
        name: 'Automobil',
        img: './carro 1.svg'
    },

]
//datasets de prueba
let productosMasComprados = [
    {
        name: 'televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    }
]

let productosEnOferta = [
    {
        name: 'televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    }
]

function addStylesheet(url) {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

function Home() {
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
                    <div className="mapsContainer">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.54949968614653!2d-74.08205488257842!3d4.631165082134345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bd4d69adbbb%3A0x43b3f4913d00eb9a!2sPUNTO%202!5e0!3m2!1ses!2sco!4v1681592970729!5m2!1ses!2sco"
                            style={{ width: '100%', height: 'auto', border: '0' }} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="rowElementContainer">
                        <h3>Busca Productos cerca de ti</h3>
                        <div>
                            <input type="text" placeholder="     ¿Qué estás buscando?" id="name" name="name" required minLength="4" maxLength="8" size="auto"></input>
                        </div>

                        <h3>Lo más comprado</h3>
                        <div className="horizontalCardContainer">
                            {
                                productosMasComprados.map((producto, indice) => {
                                    return (
                                        <div className="card producto" key={indice}>
                                            <img src={iconosFolder(producto.img)} alt=""></img>
                                            {producto.name}
                                            <img src={iconosFolder(producto.market)} alt=""></img>
                                            <button>
                                                $ {producto.price}
                                            </button>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <h2>Ofertas</h2>
                <div className="horizontalCardContainer">
                    {
                        productosEnOferta.map((producto, indice) => {
                            return (
                                <div className="card producto" key={indice}>
                                    <img src={iconosFolder(producto.img)} alt=""></img>
                                    {producto.name}
                                    <img src={iconosFolder(producto.market)} alt=""></img>
                                    <button>
                                        $ {producto.price}
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>

    );
}

export default Home;
