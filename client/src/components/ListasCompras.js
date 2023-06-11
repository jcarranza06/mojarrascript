import React, { useState,useEffect } from 'react';
import "../stylesheets/ListasCompras.css"; // import your ListasCompras styles
import { Link } from 'react-router-dom';
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

export function NewLista({listasDB,idListas}) {
  const [nuevaLista, setNuevaLista] = useState('');
  const [eliminarActivado, setEliminarActivado] = useState(false);
  const [listas, setListas] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setListas(listasDB);
    setIds(idListas);
  }, [listasDB,idListas]);

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
        
        {listas.map((lista, index) => (
          <li key={index + 1} >
            <Link to={`/listas/${ids[index]}/${lista}`}>{lista}</Link>
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
