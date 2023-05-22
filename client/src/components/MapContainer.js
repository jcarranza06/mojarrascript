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
      initMap();
    });
  }, []);

  // Función para inicializar el mapa
  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 4.637505496088567, lng: -74.09435260069357 },
      zoom: 15,
    });
  };

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapComponent;