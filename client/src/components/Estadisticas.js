import React, { useEffect, useState ,useRef } from 'react';
import "../stylesheets/Navbar.css"; // import your navbar styles
import '../stylesheets/Estadisticas.css'

import LinesChart from "./LinesChart";
import BarsChart from "./BarsChart";
import PiesChart from "./PiesChart";
import BarsChartG from "./BarsChartG";
import PiesChartG from "./PiesChartG";
import { useAuth0 } from "@auth0/auth0-react";
const Estadisticas = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0()
    const ahorroUsuario = 500;
    const [userId, setUserId] = useState(0);
    const [supermercadosFavoritos, setSupermercadosFavoritos]=useState([]);
    const [isSupermercadosFavoritos, setIsSupermercadosFavoritos] = useState(false);
    const [supermercadosFavoritosByUser, setSupermercadosFavoritosByUser]=useState([]);
    const [isSupermercadosFavoritosByUser, setIsSupermercadosFavoritosByUser] = useState(false);
    const [productosMasComprados, setProductosMasComprados]=useState([]);
    const [isProductosMasComprados, setIsProductosMasComprados] = useState(false);
    useEffect(()=>{
        getDataAlmacenesFavoritos()
        getProductosMasComprados()
        if(isAuthenticated){
            getUserId(user);
        }
    },[])

    function getUserId(user) {
        // configuracion para la petición
        const options = {
            method: "GET"
        };

        // Petición HTTP, consulta api y devuelve el body 
        let rui = "http://localhost:5000/getUser?idAuth=" + user.sub + "&name=" + user.name + "&email=" + user.email + "&foto=" + encodeURIComponent(user.picture);
        let url = new URL(rui);
        //console.log('enviadaPeticion', user, url)
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                //console.log("idUsuaro" , json.id)
                setUserId(json.id); // funcion del useState
                getDataAlmacenesFavoritosByUser(json.id)
            });
    }

    function getDataAlmacenesFavoritos() {
        // configuracion para la petición
        const options = {
            method: "GET"
        };
        // Petición HTTP, consulta api y devuelve el body 
        let url = new URL("http://localhost:5000/getSupermercadosFavoritos");
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                //console.log(json);
                setSupermercadosFavoritos(json); // funcion del useState
                setIsSupermercadosFavoritos(true)
            });
    }

    function getDataAlmacenesFavoritosByUser(id) {
        // configuracion para la petición
        const options = {
            method: "GET"
        };
        // Petición HTTP, consulta api y devuelve el body 
        let url = new URL("http://localhost:5000/getSupermercadosFavoritosByUser?idUsuario="+id);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                //console.log(json);
                setSupermercadosFavoritosByUser(json); // funcion del useState
                setIsSupermercadosFavoritosByUser(true)
            });
    }

    function getProductosMasComprados() {
        // configuracion para la petición
        const options = {
            method: "GET"
        };
        // Petición HTTP, consulta api y devuelve el body 
        let url = new URL("http://localhost:5000/getProductosMasBuscados");
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                //console.log(json);
                setProductosMasComprados(json); // funcion del useState
                setIsProductosMasComprados(true)
            });
    }

    return (
        <div className="statistics-page">
            <h1>Estadisticas de Usuario y Globales</h1>
            <p>Conoce las estadisticas respecto a los productos mas comprados, almacenes favoritos y ahorro total que se ha tenido mes a mes, tanto de todos los usuarios que utilizan mojarra price, como los tuyos. </p>
            <h1>Total de ahorro personal: <span className="green-dollar">$</span>{ahorroUsuario}</h1>
            {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
            <div>
                <p className="m-2"><b>Ahorro </b><span className="green-dollar">$</span></p>
                <div className="chart" style={{width:"450px", height:"230px"}}>
                    <LinesChart />
                </div>
            </div>
                <p className="m-2"><b>Productos más comprados</b><span className="yellow-star">&#11088;</span></p>
                <div className="bars-chart">
                    <div className='bar-1' >
                        <div className="box">USUARIO</div>
                        <BarsChart />                       
                    </div>
                    <div  className='bar-2'>
                        <div className="box">GLOBAL</div>
                        {isProductosMasComprados && <BarsChartG data={productosMasComprados}/>                       }
                    </div>
                </div>
            
                <p className="m-2"><b>Almacenes Favoritos</b><span className="yellow-star">&#11088;</span></p>
                <div className="pies-chart" >
                    {isAuthenticated && <div className='pies-1' >
                        <div className="box">USUARIO</div>
                        {isSupermercadosFavoritosByUser && <PiesChart data={supermercadosFavoritosByUser}/>                       }
                    </div>}
                    <div className='pies-2'>
                        <div className="box">GLOBAL</div>
                        {isSupermercadosFavoritos && <PiesChartG data={supermercadosFavoritos}/>}
                    </div>
                </div>
           
        
            
        </div>
    );
};

export default Estadisticas;