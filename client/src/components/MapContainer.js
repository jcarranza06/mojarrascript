import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import personaIcon from '../Iconos/pescado1.png';
import carullaIcon from '../Iconos/carulla.png';
import alkostoIcon from '../Iconos/alkosto.png';
import jumboIcon from '../Iconos/jumbo.png';
import d1Icon from '../Iconos/d1.png';
import exitoIcon from '../Iconos/exito.png';


const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Crea una instancia del loader
    const loader = new Loader({
      apiKey: 'AIzaSyC8M5k9Y7wSaUmjoW4ySE3Z4NYKW9DQXfA',
      version: 'weekly',
      libraries: ['places'],
    });

    // Carga la API de Google Maps
    loader.load().then(() => {
      // Una vez que la API se ha cargado correctamente se inicializa el mapa
      initMap();
    });
  }, []);


  // Función para inicializar el mapa
  const initMap = () => {
    const defaultLocation = { lat: 4.637505496088567, lng: -74.09435260069357 };

    const infoWindow = new window.google.maps.InfoWindow({
      content: "",
      disableAutoPan: false,
    });

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: defaultLocation,
      zoom: 15,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DEFAULT,
        position: window.google.maps.ControlPosition.TOP_RIGHT,
      },
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        map.setCenter({ lat: latitude, lng: longitude });

        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: '¡Aquí estoy!',
          icon: {
            url: personaIcon,
            scaledSize: new window.google.maps.Size(50, 50),
          },
        });
        marker.addListener("click", () => {
          infoWindow.setContent("Tu posición");
          infoWindow.open(map, marker);
          map.panTo(marker.position);
        });
      });
    } else{
      const marker = new window.google.maps.Marker({
        position: {lat: 4.637505496088567, lng: -74.09435260069357},
        map: map,
        icon: {
          url: personaIcon,
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });
    }


    // Define una variable para almacenar las referencias a los marcadores
    let markers = [];

    // Función para agregar un marcador al mapa
    const addMarker = (position, label, nombre) => {
      if (nombre === 'Carulla') {
        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          icon: {
            url: carullaIcon,
            scaledSize: new window.google.maps.Size(80, 54),
          }
        })
        marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
          map.panTo(position);
        });
  
        // Almacena la referencia del marcador en el array
        markers.push(marker);
      } else if(nombre === 'Alkosto'){
        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          icon: {
            url: alkostoIcon,
            scaledSize: new window.google.maps.Size(106, 58),
          }
        })
        marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
          map.panTo(position);
        });
  
        // Almacena la referencia del marcador en el array
        markers.push(marker);
      } else if(nombre === 'Exito'){
        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          icon: {
            url: exitoIcon,
            scaledSize: new window.google.maps.Size(101, 94),
          }
        })
        marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
          map.panTo(position);
        });
  
        // Almacena la referencia del marcador en el array
        markers.push(marker);
      } else if(nombre === 'D1'){
        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          icon: {
            url: d1Icon,
            scaledSize: new window.google.maps.Size(100, 100),
          }
        })
        marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
          map.panTo(position);
        });
  
        // Almacena la referencia del marcador en el array
        markers.push(marker);
      } else if(nombre === 'Jumbo'){
        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          icon: {
            url: jumboIcon,
            scaledSize: new window.google.maps.Size(100, 100),
          }
        })
        marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
          map.panTo(position);
        });
  
        // Almacena la referencia del marcador en el array
        markers.push(marker);
      }

      
    };

    // Función para quitar todos los marcadores del mapa
    const clearMarkers = () => {
      // Itera sobre el array de marcadores y los elimina del mapa uno por uno
      markers.forEach((marker) => {
        marker.setMap(null);
      });

      // Vacía el array de marcadores
      markers = [];
    };


    const alkostoLocations = [
      [4.760212249524242, -74.06416464200609, "ALKOSTO CL 170"],
      [4.680030768634459, -74.08583081194739, "Alkosto Avenida 68"],
      [4.610810320110308, -74.09507916866207, "Alkosto Carrera 30"],
      [4.596394206183554, -74.13951945764124, "Alkosto Venecia"],
      [4.646723680845513, -74.12820224789658, "Alkosto El Edén"]
    ];
    const carullaLocations = [
      [4.692510166638781, -74.06392166660541, "Carulla Pasadena"],
      [4.688169436192271, -74.05156351460101, "Carulla Calle 102"],
      [4.691462867889003, -74.03847431765064, "Carulla Calle 110"],
      [4.675853758389553, -74.06272394706507, "Carulla Polo Club"],
      [4.669812237498162, -74.05572903044812, "Carulla Country"],
      [4.700225016344984, -74.07535843597466, "Carulla San Nicolas"],
      [4.701594203277801, -74.05493218376911, "Carulla Autopista 116"],
      [4.712045685641605, -74.07220414588353, "Carulla Niza"],
      [4.716151714452802, -74.06894177121518, "Carulla express las villas"],
      [4.724812597931492, -74.06240340227829, "Carulla San Rafael"],
      [4.727207697325049, -74.05957038495022, "Carulla Colina"],
      [4.72087797068299, -74.03536765928102, "Carulla Calle 140"],
      [4.7278924057214216, -74.03442308229926, "Carulla express cedritos"],
      [4.646198098743995, -74.07244727627578, "Carulla express campin"],
      [4.662879593393691, -74.05527874716208, "Carulla El Nogal"],
      [4.667584824252024, -74.05021330691586, "Carulla El Retiro"],
      [4.6504759695136, -74.08678109763699, "Carulla Pablo VI"],
      [4.651544572086232, -74.10621485685529, "Carulla Plaza Claro"],
      [4.698460050279556, -74.02920217752187, "Carulla Paseo Real"],
      [4.7068435237984785, -74.05143345002432, "Carulla Santa Barbara"],
      [4.734168303509201, -74.04261402619875, "Carulla Cedro Bolivar"],
      [4.730831788606473, -74.04570413050355, "Carulla express caobos"],
      [4.7523884971165975, -74.0663041278558, "Carulla express calle 167"],
      [4.755296474094117, -74.05514608146343, "Carulla Villa Del Prado"],
      [4.724928904398192, -74.0264769265108, "Carulla Calle 147"],
      [4.726811321868172, -74.03291553910204, "Carulla express cedritos"],
      [4.761841762545671, -74.04363639048663, "Carulla Autopista 184"],
      [4.644184472729324, -74.07601136184489, "Carulla Galerias"],
      [4.635287332925433, -74.06219262152379, "Carulla Calle 47"],
      [4.652311569848501, -74.10656708748563, "Carulla Plaza Claro"],
      [4.728657177363715, -74.12085695642725, "Carulla Cortijo"],
    ];

    const jumboLocations = [
      [4.766357407339267, -74.0459203739022, "Jumbo Santafe Bogotá"],
      [4.7586593160395045, -74.06463146328109, "Jumbo calle 170"],
      [4.751474353140992, -74.08797740966206, "Jumbo Plaza Imperial - Suba"],
      [4.751474353140992, -74.08797740966206, "Jumbo Bulevar Niza"],
      [4.698440175131407, -74.08660411869847, "Jumbo Titan Plaza"],
      [4.691985633835796, -74.08370342658556, "Jumbo Calle 80"],
      [4.691930096471629, -74.0366224488192, "Jumbo Santa Ana"],
      [4.667207714771933, -74.05241529500454, "Jumbo Atlantis"],
      [4.666437798561263, -74.12399808881021, "Jumbo Hayuelos"],
      [4.635982700487329, -74.10957853335432, "Jumbo Plaza Central"],
      [4.620925762074602, -74.09086744397545, "Jumbo Carrera 30"],
      [4.572286102992202, -74.09271955651433, "Jumbo 20 de Julio"],
      [4.599835098236791, -74.15451765293295, "Jumbo Autopista Sur"],
      [4.599835098236791, -74.15451765293295, "Jumbo Soacha"]
    ];


    const exitoLocations = []
    const d1Locations = []

     // Función para manejar el cambio de ubicación seleccionada
    const handleLocationChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedLocation(selectedValue);
      
      // Hacer zoom a nivel 11 en cada cambio de ubicación seleccionada
      map.setZoom(13);

      // Lógica para marcar ubicaciones de Carulla
      const markCarullaLocations = () => {
        carullaLocations.forEach((location) => {
          const position = {
            lat: location[0],
            lng: location[1],
          };
          const label = location[2];
          const nombre = "Carulla"

          // Agrega un marcador para cada ubicación de Carulla
          addMarker(position, label, nombre);
        });
      };

      // Marcar ubicaciones de Alkosto
      const markAlkostoLocations = () => {
        alkostoLocations.forEach((location) => {
          const position = {
            lat: location[0],
            lng: location[1],
          };
          const label = location[2];
          const nombre = "Alkosto"

          // Agrega un marcador para cada ubicación de Alkosto
          addMarker(position, label, nombre);
        });
      };

      // Marcar ubicaciones de Exito
      const markExitoLocations = () => {
        exitoLocations.forEach((location) => {
          const position = {
            lat: location[0],
            lng: location[1],
          };
          const label = location[2];
          const nombre = "Exito"

          // Agrega un marcador para cada ubicación de Exito
          addMarker(position, label, nombre);
        });
      };

      // Marcar ubicaciones de D1
      const markD1Locations = () => {
        d1Locations.forEach((location) => {
          const position = {
            lat: location[0],
            lng: location[1],
          };
          const label = location[2];
          const nombre = "D1"

          // Agrega un marcador para cada ubicación de D1
          addMarker(position, label, nombre);
        });
      };

      const markJumboLocations = () => {
        jumboLocations.forEach((location) => {
          const position = {
            lat: location[0],
            lng: location[1],
          };
          const label = location[2];
          const nombre = "Jumbo"

          // Agrega un marcador para cada ubicación de D1
          addMarker(position, label, nombre);
        });
      };

      // Funciones para marcar las ubicaciones
      if (selectedValue === 'Alkosto') {
        
        clearMarkers(); // Primero, se eliminan los marcadores existentes
        markAlkostoLocations(); // Luego, se marcan las ubicaciones de Alkosto
      } else if (selectedValue === 'Carulla') {
        clearMarkers(); // Primero, se eliminan los marcadores existentes
        markCarullaLocations(); // Luego, se marcan las ubicaciones de Carulla
      } else if (selectedValue === 'Exito') {
        clearMarkers(); // Primero, se eliminan los marcadores existentes
        markExitoLocations(); // Luego, se marcan las ubicaciones de Exito
      } else if (selectedValue === 'D1') {
        clearMarkers(); // Primero, se eliminan los marcadores existentes
        markD1Locations(); // Luego, se marcan las ubicaciones de D1
      } else if (selectedValue === 'Jumbo') {
        clearMarkers(); // Primero, se eliminan los marcadores existentes
        markJumboLocations(); // Luego, se marcan las ubicaciones de Jumbo
      }



    };

    // Agregar la lista desplegable al mapa utilizando el DOM
    const dropdownContainer = document.createElement('div');
    //dropdownContainer.style.backgroundColor = 'black';
    dropdownContainer.style.padding = '15px';
    dropdownContainer.style.width = '200px'; // Ajusta el ancho del contenedor
    dropdownContainer.style.height = '200px';

    const dropdown = document.createElement('select');
    dropdown.addEventListener('change', handleLocationChange);
    dropdown.style.color = 'black';
    dropdown.style.fontSize = "120";
    dropdown.style.fontFamily = "Times New Roman";

    const locations = ['Selecciona un Supermercado', 'Éxito', 'Alkosto', 'Jumbo', 'D1', 'Carulla'];

    locations.forEach((location) => {
      const option = document.createElement('option');
      option.value = location;
      option.text = location;
      dropdown.appendChild(option);
    });

    dropdownContainer.appendChild(dropdown);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(dropdownContainer);
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default MapComponent;