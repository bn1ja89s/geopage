import React, { useState } from 'react';

const MenuSidebarGeoPublic = () => {
  // Estados para controlar la expansión de los submenús
  const [isCatastroOpen, setIsCatastroOpen] = useState(false);
  const [isRedGeodesicaOpen, setIsRedGeodesicaOpen] = useState(false);
  const [isConcesionesOpen, setIsConcesionesOpen] = useState(false);

  // Funciones para alternar los submenús
  const toggleCatastro = () => setIsCatastroOpen(!isCatastroOpen);
  const toggleRedGeodesica = () => setIsRedGeodesicaOpen(!isRedGeodesicaOpen);
  const toggleConcesiones = () => setIsConcesionesOpen(!isConcesionesOpen);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <img
          src="/img/acroming.png"
          alt="Acroming Ecuador"
          className="brand-image img-circle elevation-3"
          style={{ opacity: '.8' }}
        />
        <span className="brand-text font-weight-light">Geoportal</span>
      </a>

      <div className="sidebar">
        {/* Menú estático con submenús */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
            {/* Catastro */}
            <li className={`nav-item has-treeview ${isCatastroOpen ? 'menu-open' : ''}`}>
              <a
                href="#!"
                className="nav-link"
                onClick={toggleCatastro}
              >
                <i className="nav-icon fas fa-map"></i>
                <p>
                  Catastro
                  <i className={`right fas fa-angle-left ${isCatastroOpen ? 'open' : ''}`}></i>
                </p>
              </a>
              <ul className={`nav nav-treeview ${isCatastroOpen ? 'd-block' : 'd-none'}`}>
                <li className="nav-item">
                  <a href="/catastro-urbanos" className="nav-link">
                    <i className="far fa-check-square nav-icon"></i>
                    <p>Catastro Urbanos</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/catastro-rurales" className="nav-link">
                    <i className="far fa-check-square nav-icon"></i>
                    <p>Catastro Rurales</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* Red Geodésica */}
            <li className={`nav-item has-treeview ${isRedGeodesicaOpen ? 'menu-open' : ''}`}>
              <a
                href="#!"
                className="nav-link"
                onClick={toggleRedGeodesica}
              >
                <i className="nav-icon fas fa-network-wired"></i>
                <p>
                  Red Geodésica
                  <i className={`right fas fa-angle-left ${isRedGeodesicaOpen ? 'open' : ''}`}></i>
                </p>
              </a>
              <ul className={`nav nav-treeview ${isRedGeodesicaOpen ? 'd-block' : 'd-none'}`}>
                <li className="nav-item">
                  <a href="/placas-red" className="nav-link">
                    <i className="far fa-check-square nav-icon"></i>
                    <p>Placas de Red</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/itos-marcados" className="nav-link">
                    <i className="far fa-check-square nav-icon"></i>
                    <p>Itos Marcados</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* Concesiones */}
            <li className={`nav-item has-treeview ${isConcesionesOpen ? 'menu-open' : ''}`}>
              <a
                href="#!"
                className="nav-link"
                onClick={toggleConcesiones}
              >
                <i className="nav-icon fas fa-landmark"></i>
                <p>
                  Concesiones
                  <i className={`right fas fa-angle-left ${isConcesionesOpen ? 'open' : ''}`}></i>
                </p>
              </a>
              <ul className={`nav nav-treeview ${isConcesionesOpen ? 'd-block' : 'd-none'}`}>
                <li className="nav-item">
                  <a href="/concesiones-mineras" className="nav-link">
                    <i className="far fa-check-square nav-icon"></i>
                    <p>Concesiones Mineras</p>
                  </a>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebarGeoPublic;
