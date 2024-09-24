import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@profabric/react-components';
import styled from 'styled-components';
import { LayerContext } from '@pages/geoportal/context/LayerContext';

// Definición de las rutas públicas del menú
export const PUBLIC_MENU = [
  {
    name: 'Mapa Público',
    icon: 'fas fa-map',
    path: '/geoportal/mapa-publico',
  },
  {
    name: 'Servicios Geográficos',
    icon: 'fas fa-globe',
    path: '/geoportal/servicios-geograficos',
  },
  {
    name: 'Documentación',
    icon: 'fas fa-file-alt',
    path: '/geoportal/documentacion',
  },
];

// Estilos para la imagen de la marca
const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

// Componente del menú lateral público
const MenuSidebarGeoPublic = () => {
  const { layers, toggleLayer, activeLayerIds } = useContext(LayerContext);
  return (
    <aside className="main-sidebar elevation-4 sidebar-dark-primary">
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="img/acroming.png"
          alt="Acroming Ecuador"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-light">Geoportal Público</span>
      </Link>

      <div className="sidebar">
        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
            {/* Itera sobre las rutas públicas definidas en PUBLIC_MENU */}
            {PUBLIC_MENU.map((menuItem) => (
              <li key={menuItem.name} className="nav-item">
                <Link to={menuItem.path} className="nav-link">
                  <i className={`${menuItem.icon} nav-icon`}></i>
                  <p>{menuItem.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebarGeoPublic;
