import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var beneficios = [90, 70, 50, 25, 10];
var meses = ["Mojarra", "Trucha", "Salmon", "Nicuro", "Bagre"];

var misoptions = {
    responsive : true,
    animation : false,
    plugins : {
        legend : {
            display : false
        }
    },
    scales : {
        /*y : {
            min : 0,
            max : 100
        },*/
        x: {
            ticks: { color: 'rgba(0, 220, 195)'}
        }
    }
};

function agruparElementos(arreglo) {
    const resultado = {};

    arreglo.forEach((elemento) => {
        for (const key in elemento) {
            if (elemento.hasOwnProperty(key)) {
                if (resultado.hasOwnProperty(key)) {
                    resultado[key].push(elemento[key]);
                } else {
                    resultado[key] = [elemento[key]];
                }
            }
        }
    });

    return resultado;
}

export default function Bars(props) {
    console.log(props.data)
    let formatedData = agruparElementos(props.data)

    var midata = {
        labels: formatedData.NOMBREPRODUCTO,
        datasets: [
            {
                label: 'Beneficios',
                data: formatedData.cantidad,
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            }
        ]
    };
    return <Bar data={midata} options={misoptions} />
}