import React from 'react'
import "../stylesheets/Home.css"; // import your navbar styles

function CardProducto({data},{index}) {
    return (
        <div className="card producto" key={index}>
            <img src="../Iconos/image 154.png" alt=""></img>
            {data.name}
            {index}
            <img src="" alt=""></img>
            <button>
                $ 5
            </button>
        </div>
    );
}

export default CardProducto;
