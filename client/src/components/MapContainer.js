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
            scaledSize: new window.google.maps.Size(75, 70),
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
            scaledSize: new window.google.maps.Size(70, 70),
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
            scaledSize: new window.google.maps.Size(70, 70),
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

    const exitoLocations = [
      [4.751720269070682, -74.09673214249504, "Éxito Suba"],
      [4.750864911469561, -74.09175396100227, "Exito Express Praderas de Suba"],
      [4.7570234611344056, -74.04471874549941, "Éxito Norte"],
      [4.738547647164015, -74.06686306228725, "Éxito Wow Colina"],
      [4.7305070922999315, -74.0457487137221, "Éxito Express Cra 19 Con 145"],
      [4.725545852281601, -74.04386043864717, "Éxito Express Calle 140"],
      [4.726572318648482, -74.0357923542361, "Éxito Express 12 Con 144"],
      [4.715623265745529, -74.03424740190206, "Éxito Wow Country"],
      [4.706727033154773, -74.04300213179494, "Éxito Unicentro"],
      [4.696804178028275, -74.04695034331525, "Éxito Express San Patricio"],
      [4.689618574089794, -74.04763698879704, "Éxito Express Cra 15 Con 100 T.Ali"],
      [4.699028278533462, -74.06154155980336, "Éxito Express Pasadena"],
      [4.70878002000851, -74.07098293517801, "Éxito Niza"],
      [4.697659602139106, -74.07853603547774, "Éxito Express Calle 98 Con 70"],
      [4.665406402559249, -74.05690674865524, "Éxito Express Calle 76 Con 14"],
      [4.645730477774008, -74.06188492839824, "Éxito Express Carrera 7"],
      [4.621434230687757, -74.06875138321618, "Éxito San Martín"],
      [4.612536804878491, -74.07149796514335, "Éxito Las Nieves"],
      [4.6198942995917305, -74.08626084300192, "Éxito Calima"],
      [4.6356356596210455, -74.09347062056074, "Éxito Express Calle 24 Con 43A"],
      [4.65137666898899, -74.1029119959354, "Éxito Gran Estación"],
      [4.656851720269056, -74.10977845075334, "Éxito Plaza Salitre"],
      [4.662668915557936, -74.11801819653485, "Éxito Esperanza"],
      [4.668314970802972, -74.12127976257338, "Éxito Modelia"],
      [4.677040603003781, -74.15441040797407, "Éxito Fontibon"],
      [4.633411358095681, -74.1250563136274, "Éxito Americas"],
      [4.703426651337916, -74.11512369523346, "Éxito Diverplaza WOW"],
      [4.725496046950738, -74.12216181142185, "Éxito Occidente"],
      [4.64386161041861, -74.1554233522927, "Éxito Tintal"],
      [4.64386161041861, -74.1554233522927, "Éxito Restrepo"],
      [4.595224192786818, -74.1255631541912, "Éxito Villa Mayor"],
      [4.580341930199202, -74.13114676974908, "Éxito Ciudad Tunal"],
      [4.607323364345152, -74.1826131274525, "Éxito Bosa"],
      [4.624624821801166, -74.15360260978476, "Éxito Nuevo Kenedy"],
      [4.535424186615313, -74.11745404751342, "Éxito Usme"],
      [4.589839510899006, -74.20603131871076, "Éxito Soacha"],
      [4.610372519633529, -74.1222605681237, "Éxito cra13 con 53"]
    ];

    const d1Locations = [
      [4.759280475561835, -74.11479017988005, "D1 Mirador del Parque"],
      [4.748313975475322, -74.11331684938779, "D1 San Carlos"],
      [4.743181983920289, -74.12438992866224, "D1 Suba Lisboa"],
      [4.744807424880097, -74.12911101616574, "D1 Villa Cindy"],
      [4.726694457249023, -74.13442061778338, "D1 CC Ronda del Rio"],
      [4.742230225743541, -74.11343488977523, "D1 La Gaitana"],
      [4.7383062089737, -74.10259347615879, "D1 Alcaparros"],
      [4.753019027470469, -74.09134875724494, "D1 Villa Imperial"],
      [4.744807233365932, -74.09701503786296, "D1 Lombardia"],
      [4.743609797850304, -74.10010535441661, "D1 Lombardia"],
      [4.737877987450402, -74.08980447696811, "D1 Bosques de suba"],
      [4.731634171877358, -74.09993402480733, "D1 Suba Lagos"],
      [4.734712551357751, -74.08559819783451, "D1 Villa Eliza"],
      [4.744207794464104, -74.08448169392618, "D1 Campiña Alta"],
      [4.757295796155916, -74.07898938292293, "D1 Suba Salitre"],
      [4.7639671889560065, -74.03041024317014, "D1 Lijacá"],
      [4.753360974265143, -74.04285672213445, "D1 La Uribe"],
      [4.746774885736907, -74.0407102646238, "D1 La Uribe"],
      [4.748656490836576, -74.05847657999092, "Tiendas D1 Britalia"],
      [4.744379426339288, -74.05804761568089, "D1 Cantalejo"],
      [4.7328677962819645, -74.0500942965307, "Tienda D1 Victoria Norte"],
      [4.727308516360975, -74.05137070568895, "D1 Autonorte 144"],
      [4.717385620779771, -74.03034238166548, "D1 Belmira"],
      [4.718840136009596, -74.0575517285533, "D1 prado jardin"],
      [4.717727813439314, -74.05952476587947, "D1 Prado Veraniego"],
      [4.722604192479734, -74.06750800490974, "D1 Las Villas"],
      [4.692921357267249, -74.04562205707879, "D1 108"],
      [4.695102685154739, -74.04957008608385, "D1 Chicó Navarra"],
      [4.691937546296422, -74.05712308207428, "D1 Pasadena"],
      [4.6813725039259975, -74.05875297729678, "D1 Castellana"],
      [4.668968675357859, -74.05806682701608, "D1 El Retiro"],
      [4.660755799197098, -74.06115583925884, "D1 Caracas con 72a"],
      [4.651345324497767, -74.06561907547368, "D1 San Luis"],
      [4.646298254158885, -74.07308743248124, "D1 Calle 57"],
      [4.718693576839744, -74.09949568134252, "D1 Quirigua"],
      [4.70072999251422, -74.10327223149238, "D1 Soledad Norte"],
      [4.678987600871691, -74.0819297002266, "D1 Barrios Unidos"],
      [4.623883854886614, -74.06864955257022, "Tienda D1 - Samper"],
      [4.624459373166367, -74.07687747013993, "Tiendas D1 La Estrella"],
      [4.6132366824383135, -74.0731243849327, "D1 Alameda"],
      [4.640142066111588, -74.09665334219346, "D1 UNAL"],
      [4.670643185863066, -74.11484137177439, "D1 Modelia"],
      [4.667621907597687, -74.13115285748276, "D1 CC Hayuelos"],
      [4.690839005401216, -74.09896315025094, "D1 Santa Helenita"],
      [4.69702521304932, -74.1133980933557, "D1 La Florida"],
      [4.682494731535659, -74.13577225516806, "D1 Fontibon San Jose"],
      [4.679617372631803, -74.1431340761515, "D1 Fontibon"],
      [4.686379147381251, -74.0930448229108, "D1 Palo Blanco"],
      [4.646526896646436, -74.12075991467287, "D1 Villa Alsacia"],
      [4.651274756259688, -74.14746455941668, "D1 Monterrey"],
      [4.60913922348091, -74.11956976062811, "D1 Ciudad Montes"],
      [4.589901493394547, -74.08181967278433, "D1 Calvo sur"],
      [4.573083178667085, -74.09420073053374, "D1 - 20 de Julio"],
      [4.625084299254122, -74.17428812673923, "D1 -CHICALÁ"],
      [4.62163118560916, -74.15422355582362, "D1 Kenedy"],
      [4.599473306604323, -74.17327768072191, "D1 La Estancia"],
      [4.5924229276454165, -74.19810578286207, "D1 - León XIII Soacha"],
      [4.586523577156568, -74.11813619725218, "D1 El Inglés"],
      [4.597890574288024, -74.13646857499522, "D1 La Alquería"],
      [4.633141498783066, -74.1304058986013, "D1 Marsella"],
      [4.645067860107124, -74.1740434138816, "D1 Bellavista"],
      [4.630011115174281, -74.18142485281088, "D1 Bosa Brasil"],
      [4.62410809926505, -74.1907803975003, "D1 Bosa San Pedro"],
      [4.700263292042001, -74.07534957003305, "D1 San Nicolas"],
      [4.702059672547231, -74.08084273398546, "D1 Pontevedra"]
    ];

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
      } else if (selectedValue === 'Éxito') {
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