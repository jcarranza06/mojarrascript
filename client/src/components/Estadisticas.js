import React, { useEffect, useRef } from 'react';
import "../stylesheets/Navbar.css"; // import your navbar styles
import '../stylesheets/Estadisticas.css'

import LinesChart from "./LinesChart";
import BarsChart from "./BarsChart";
import PiesChart from "./PiesChart";
import BarsChartG from "./BarsChartG";
import PiesChartG from "./PiesChartG";

const Estadisticas = () => {
    const ahorroUsuario = 500;
    return (
        <div className="statistics-page">
            <h1>Estadisticas de Usuario y Globales</h1>
            <p>Conoce las estadisticas respecto a los productos mas comprados, almacenes favoritos y ahorro total que se ha tenido mes a mes, tanto de todos los usuarios que utilizan mojarra price, como los tuyos. </p>
            <h1>Total de ahorro personal: <span class="green-dollar">$</span>{ahorroUsuario}</h1>
            {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
            <div>
                <p className="m-2"><b>Ahorro </b><span class="green-dollar">$</span></p>
                <div className="chart" style={{width:"450px", height:"230px"}}>
                    <LinesChart />
                </div>
            </div>
                <p className="m-2"><b>Productos más comprados</b><span class="yellow-star">&#11088;</span></p>
                <div className="bars-chart">
                    <div className='bar-1' >
                        <div class="box">USUARIO</div>
                        <BarsChart />                       
                    </div>
                    <div  className='bar-2'>
                        <div class="box">GLOBAL</div>
                        <BarsChartG />                       
                    </div>
                </div>
            
                <p className="m-2"><b>Almacenes Favoritos</b><span class="yellow-star">&#11088;</span></p>
                <div className="pies-chart" >
                    <div className='pies-1' >
                        <div class="box">USUARIO</div>
                        <PiesChart />                       
                    </div>
                    <div className='pies-2'>
                        <div class="box">GLOBAL</div>
                        <PiesChartG />                       
                    </div>
                </div>
           
        
            
        </div>
    );
};

export default Estadisticas;