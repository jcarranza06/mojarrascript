import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = () => {
  useEffect(() => {
    // Crea una instancia del loader
    const loader = new Loader({
      apiKey: 'AIzaSyC8M5k9Y7wSaUmjoW4ySE3Z4NYKW9DQXfA',
      version: 'weekly',
    });

    // Carga la API de Google Maps
    loader.load().then(() => {
      // Una vez que la API se ha cargado correctamente se inicializa el mapa
      //initMap();
      getUserPos();
    });
  }, []);

  const opcionesDeSolicitud = {
    enableHighAccuracy: true, // Alta precisión
    maximumAge: 0, // No queremos caché
    timeout: 10000 // Esperar solo 10 segundos
};

const onErrorDeUbicacion = err => {
    console.log("Error obteniendo ubicación: ", err);
}

  const getUserPos = () =>{
    navigator.geolocation.getCurrentPosition(initMap, onErrorDeUbicacion, opcionesDeSolicitud);
  };

  // Función para inicializar el mapa
  const initMap = location => {
    console.log(location.coords.latitude);
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: location.coords.latitude, lng: location.coords.longitude },
      zoom: 15,
    });
  };

  return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default MapComponent;