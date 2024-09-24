/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation, Location } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IMenuItem } from '@app/modules/main/menu-sidebar/MenuSidebar';
// Componente MenuItem que representa un elemento de menú
const MenuItem = ({ menuItem }: { menuItem: IMenuItem }) => {
  const [t] = useTranslation();
  const [isMenuExtended, setIsMenuExtended] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const [isMainActive, setIsMainActive] = useState(false);
  const [isOneOfChildrenActive, setIsOneOfChildrenActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

// Alterna la expansión del menú
const toggleMenu = () => {
  setIsMenuExtended(!isMenuExtended);
};

// Acciona el menú principal o expande si tiene submenús
const handleMainMenuAction = () => {
  if (isExpandable) {
    toggleMenu();
    return;
  }
  navigate(menuItem.path ? menuItem.path : '/');
};

// Calcula si el menú o un submenú está activo en función de la URL

  const calculateIsActive = (url: Location) => {
    setIsMainActive(false);
    setIsOneOfChildrenActive(false);
    // Si el menú es expandible y tiene submenús, verifica si uno coincide con la URL
    if (isExpandable && menuItem && menuItem.children) {
      menuItem.children.forEach((item) => {
        if (item.path === url.pathname) {
          setIsOneOfChildrenActive(true); // Activa el submenú
          setIsMenuExtended(true); // Expande el menú
        }
      });
    } else if (menuItem.path === url.pathname) {
      setIsMainActive(true); // Activa el menú principal si coincide con la URL
    }
  };

  // Hook para calcular el estado activo del menú cuando cambia la ubicación o el menú
  useEffect(() => {
    if (location) {
      calculateIsActive(location);
    }
  }, [location, isExpandable, menuItem]);

  // Hook para colapsar el menú si no está activo ni uno de los submenús
  useEffect(() => {
    if (!isMainActive && !isOneOfChildrenActive) {
      setIsMenuExtended(false); // Colapsa el menú
    }
  }, [isMainActive, isOneOfChildrenActive]);

  // Hook para determinar si el menú es expandible al tener submenús
  useEffect(() => {
    setIsExpandable(
      Boolean(menuItem && menuItem.children && menuItem.children.length > 0)
    );
  }, [menuItem]);

  return (
    <li className={`nav-item${isMenuExtended ? ' menu-open' : ''}`}>
      {/* Link del menú principal */}
      <a
        className={`nav-link${isMainActive || isOneOfChildrenActive ? ' active' : ''}`}
        role="link"
        onClick={handleMainMenuAction}
        style={{ cursor: 'pointer' }}
      >
        <i className={`${menuItem.icon}`} /> {/* Ícono del menú */}
        <p>{t(menuItem.name)}</p> {/* Nombre del menú traducido */}
        {isExpandable ? <i className="right fas fa-angle-left" /> : null} {/* Flecha de expansión */}
      </a>

      {/* Submenús, si existen */}
      {isExpandable && menuItem.children &&
        menuItem.children.map((item) => (
          <ul key={item.name} className="nav nav-treeview">
            <li className="nav-item">
              <NavLink className="nav-link" to={`${item.path}`}>
                <i className={`${item.icon}`} /> {/* Ícono del submenú */}
                <p>{t(item.name)}</p> {/* Nombre del submenú traducido */}
              </NavLink>
            </li>
          </ul>
        ))}
    </li>
  );
};

export default MenuItem;
