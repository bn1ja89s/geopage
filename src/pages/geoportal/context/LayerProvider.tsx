// src/context/LayerProvider.tsx
import React, { useState, ReactNode } from 'react';
import { LayerContext } from './LayerContext';
import mapConfig from '@pages/geoportal/mapConfig';
import L from 'leaflet';

interface LayerProviderProps {
  children: ReactNode;
}

export const LayerProvider = ({ children }: LayerProviderProps) => {
  // Extraer las capas superpuestas del mapConfig
  const overlayLayers = mapConfig.overlayLayers.map((layerConfig) => {
    let layer: L.Layer;
    if (layerConfig.type === 'wms') {
      layer = L.tileLayer.wms(layerConfig.url, layerConfig.options as L.WMSOptions);
    } else {
      layer = L.tileLayer(layerConfig.url, layerConfig.options);
    }
    return {
      id: layerConfig.name,
      name: layerConfig.name,
      layer: layer,
    };
  });

  const [activeLayerIds, setActiveLayerIds] = useState<string[]>(
    overlayLayers.map((layer) => layer.id)
  );

  const toggleLayer = (layerId: string) => {
    setActiveLayerIds((prevActiveLayerIds) =>
      prevActiveLayerIds.includes(layerId)
        ? prevActiveLayerIds.filter((id) => id !== layerId)
        : [...prevActiveLayerIds, layerId]
    );
  };

  return (
    <LayerContext.Provider value={{ layers: overlayLayers, toggleLayer, activeLayerIds }}>
      {children}
    </LayerContext.Provider>
  );
};
