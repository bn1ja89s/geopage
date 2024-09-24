import React, { createContext, useState, ReactNode } from 'react';

interface Layer {
  id: string;
  name: string;
  layer: L.Layer; // Asegúrate de que L está importado correctamente
}

interface LayerContextProps {
  layers: Layer[];
  toggleLayer: (layerId: string) => void;
  activeLayerIds: string[];
}

export const LayerContext = createContext<LayerContextProps>({
  layers: [],
  toggleLayer: () => {},
  activeLayerIds: [],
});