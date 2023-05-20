import React, {useState} from 'react'

import "../stylesheets/Home.css"; // import your navbar styles
import prev from "../Iconos/Icons/prev.png";
import next from "../Iconos/Icons/next.png";


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

]
//datasets de prueba
let productosMasComprados = [
    {
        name: 'Televisor 32"',
        img: './image 154.png',
        market: './image 113.png',
        price: 170000
    },
    {
        name: 'Televisor 32"',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'Televisor 32"',
        img: './image 154.png',
        market: './image 113.png',
        price: 217500
    },
    {
        name: 'Televisor 32"',
        img: './image 154.png',
        market: './image 113.png',
        price: 218500
    },
    {
        name: 'Televisor 32"    ',
        img: './image 154.png',
        market: './image 113.png',
        price: 219500
    },
    {
        name: 'Televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 200500
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
        name: 'Televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'Televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'Televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'Televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'Televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },{
        name: 'Televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'Televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },
    {
        name: 'televisor',
        img: './image 154.png',
        market: './image 113.png',
        price: 154000
    },{
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

    const [scrollAmount, setScrollAmount] = useState(0);

    const handleScroll = (scrollOffset) => {
    const container = document.querySelector('.horizontalCardContainer.mas');
    const newScrollAmount = scrollAmount + scrollOffset;
    container.scrollLeft = newScrollAmount;
    setScrollAmount(newScrollAmount);

  };

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
                            title="Ubicacion de usuario"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.54949968614653!2d-74.08205488257842!3d4.631165082134345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bd4d69adbbb%3A0x43b3f4913d00eb9a!2sPUNTO%202!5e0!3m2!1ses!2sco!4v1681592970729!5m2!1ses!2sco"
                            style={{ width: '100%', height: '100%', border: '0' }} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="rowElementContainer">
                        <h1>Busca Productos cerca de ti</h1>
                        <div>
                            <input className='inputProductosCerca' type="text" placeholder="       ¿Qué lugar estás buscando?" id="name" name="name" required minLength="4" maxLength="8" size="auto"></input>
                        </div>

                        <h1>Lo más comprado</h1>
                        <div className='productosMasComprados'> 
                        <img onClick={() => handleScroll(-300)} className='imagenPrev' src={prev} alt="flecha correr hacia " width="20rem" height="20rem" />
                        <div className="horizontalCardContainer mas" style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
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
                        <img onClick={() => handleScroll(300)} className='imagenPrev' src={next} alt="flecha correr hacia " width="20rem" height="20rem" />
                        </div>
                    </div>
                </div>
                <h1>Ofertas</h1>
                <div className="horizontalCardContainerOfertas">
                    {
                        productosEnOferta.map((producto, indice) => {
                            return (
                                <div className="card producto" key={indice}>
                                    <img src={iconosFolder(producto.img)} alt=""></img>
                                    {producto.name}
                                    <img src={iconosFolder(producto.market)} width="50em" alt=""></img>
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
