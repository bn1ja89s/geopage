
import L from 'leaflet';

interface BaseLayerConfig {
  name: string;
  url: string;
  options?: L.TileLayerOptions;
}

interface OverlayLayerConfig {
  name: string;
  type: 'wms' | 'tile';
  url: string;
  options?: L.WMSOptions | L.TileLayerOptions;
}

interface MarkerConfig {
  position: L.LatLngExpression;
  options?: L.MarkerOptions;
  events?: {
    [key: string]: string;
  };
}

interface MapConfig {
  center: L.LatLngExpression;
  zoom: number;
  baseLayers: BaseLayerConfig[];
  overlayLayers: OverlayLayerConfig[];
  markers?: MarkerConfig[];
}

const mapConfig: MapConfig = {
  center: [-1.928180, -78.711679],
  zoom: 7,
  baseLayers: [
    {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    {
      name: 'Google Streets',
      url: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      options: {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      },
    },
    // ... Añade las demás capas base
  ],
  overlayLayers: [
    {
      name: 'Catastro Guamote',
      type: 'wms',
      url: 'http://localhost:8080/geoserver/guamote/wms?',
      options: {
        layers: 'ch_catastro_guamote_pol',
        format: 'image/png',
        transparent: true,
      },
    },
    // ... Añade las demás capas superpuestas
  ],
  markers: [
    {
      position: [-1.92784, -78.71149],
      options: {
        draggable: true,
      },
      events: {
        move: 'move',
        click: 'click',
        dblclick: 'dblclick',
      },
    },
  ],
};

export default mapConfig;
