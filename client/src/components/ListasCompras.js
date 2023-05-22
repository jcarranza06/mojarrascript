import React, { useState } from 'react';
import "../stylesheets/ListasCompras.css"; // import your ListasCompras styles

export function List() {
  return (
    <list className="List">
      <div className='textgrande'>Listas de Compras</div>
      <div className='text'>Crea tu propia lista de compras para que conozcas en qué almacén tendrás un mayor ahorro en tus próximas compras.</div>
      <div className='Listas'>
      </div>
    </list>
  )
}

export function NewLista() {
  const [nuevaLista, setNuevaLista] = useState('');
  const [listas, setListas] = useState(['Favoritos']);
  const [eliminarActivado, setEliminarActivado] = useState(false);

  function crearListaDeCompras() {
    if (nuevaLista.trim() !== '') {
      setListas([...listas, nuevaLista]);
      setNuevaLista('');
    }
  }

  function handleInputChange(event) {
    setNuevaLista(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      crearListaDeCompras();
    }
  }

  function eliminarListaDeCompras(index) {
    if (eliminarActivado && index !== 0) {
      const nuevasListas = listas.filter((_, i) => i !== index);
      setListas(nuevasListas);
      setEliminarActivado(false);
    }
  }

  return (
    <div className="new-lista-container">
      <ul className="lista-compras">
        <li>
          <strong>
            <span className="bullet"></span>
            {listas[0]}
          </strong>
        </li>
        {listas.slice(1).map((lista, index) => (
          <li key={index + 1} onClick={() => eliminarListaDeCompras(index + 1)}>
            {lista}
          </li>
        ))}
      </ul>
      
      <div className="input-container">
      <button className="boton-crear" onClick={crearListaDeCompras}>
          Crear nueva lista de compras
        </button>
        
        <input
          type="text"
          value={nuevaLista}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

         <button
        className={`boton-eliminar${eliminarActivado ? ' activado' : ''}`}
        onClick={() => setEliminarActivado(!eliminarActivado)}
        >
         Eliminar lista de compras
        </button>

      </div>
      
    </div>
  );
}

export default List;
