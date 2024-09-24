import { InfoBox } from '@app/components/info-box/InfoBox';
import { ContentHeader, SmallBox } from '@components';
import {
  faBookmark,
  faEnvelope,
  faChartSimple,
  faCartShopping,
  faUserPlus,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapConfig from './mapConfig';

// Importar las imágenes de los íconos usando new URL()
const markerIconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href;
const markerIcon2xUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href;
const markerShadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href;

// Crear un ícono personalizado
const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2xUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const MapaPublico = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    let map: L.Map;

    if (mapRef.current) {
      map = L.map(mapRef.current).setView(mapConfig.center, mapConfig.zoom);

      // Capas Base
      const baseLayers: { [key: string]: L.TileLayer } = {};
      mapConfig.baseLayers.forEach((layerConfig) => {
        const layer = L.tileLayer(layerConfig.url, layerConfig.options);
        baseLayers[layerConfig.name] = layer;
      });

      // Capas Superpuestas
      const overlayLayers: { [key: string]: L.Layer } = {};
      mapConfig.overlayLayers.forEach((layerConfig) => {
        let layer: L.Layer;
        if (layerConfig.type === 'wms') {
          layer = L.tileLayer.wms(layerConfig.url, layerConfig.options as L.WMSOptions);
        } else {
          layer = L.tileLayer(layerConfig.url, layerConfig.options);
        }
        overlayLayers[layerConfig.name] = layer;
      });

      // Añadir la primera capa base al mapa
      const firstBaseLayer = Object.values(baseLayers)[0];
      if (firstBaseLayer) {
        firstBaseLayer.addTo(map);
      }

      // Añadir capas superpuestas al mapa
      Object.values(overlayLayers).forEach((layer) => {
        layer.addTo(map);
      });

      // Añadir el control de capas
      L.control.layers(baseLayers, overlayLayers).addTo(map);

      // Mostrar la escala
      L.control.scale().addTo(map);

      // Actualizar la posición del mouse
      map.on('mousemove', function (e: L.LeafletMouseEvent) {
        setMousePosition({
          lat: parseFloat(e.latlng.lat.toFixed(5)),
          lng: parseFloat(e.latlng.lng.toFixed(5)),
        });
      });

      // Añadir marcadores desde la configuración
      if (mapConfig.markers) {
        const markerEventHandlers: { [key: string]: L.LeafletEventHandlerFn } = {
          move: () => console.log('Eiffel moviendo'),
          click: () => console.log('Click en el marcador'),
          dblclick: () => console.log('Doble click en el marcador'),
          // Añade más manejadores de eventos si es necesario
        };

        mapConfig.markers.forEach((markerConfig) => {
          const marker = L.marker(markerConfig.position, {
            ...markerConfig.options,
            icon: defaultIcon, // Asignar el ícono personalizado aquí
          }).addTo(map);

          // Adjuntar eventos al marcador
          if (markerConfig.events) {
            Object.entries(markerConfig.events).forEach(([eventName, handlerName]) => {
              const eventHandler = markerEventHandlers[handlerName];
              if (eventHandler) {
                marker.on(eventName, eventHandler);
              }
            });
          }
        });
      }
    }

    // Función de limpieza para remover el mapa al desmontar el componente
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" ref={mapRef} style={{ height: '90vh' }}></div>
      {mousePosition && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            padding: '5px 10px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '4px',
          }}
        >
          Posición del mouse: Latitud {mousePosition.lat}, Longitud {mousePosition.lng}
        </div>
      )}
    </div>
  );
};

export default MapaPublico;