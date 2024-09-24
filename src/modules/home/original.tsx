import { ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  toggleControlSidebar,
  toggleSidebarMenu,
} from '@app/store/reducers/ui';
import { styled } from 'styled-components';
import { Image } from '@profabric/react-components';
import { useAppDispatch, useAppSelector } from '@app/store/store';

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  opacity: 1; // Añadido valor de opacidad
  
  margin: -1px 4px 0 6px;

  &:hover {
    color: inherit;
  }
`;

const Header = ({ containered, ...rest }: { containered?: boolean } & any) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const navbarVariant = useAppSelector((state) => state.ui.navbarVariant);
  const headerBorder = useAppSelector((state) => state.ui.headerBorder);
  const topNavigation = true;

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };

  const handleToggleControlSidebar = () => {
    dispatch(toggleControlSidebar());
  };

  const getContainerClasses = useCallback(() => {
    let classes = `navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  return (
    <nav className={getContainerClasses()} {...rest}>
      <div
        style={{ width: '100%', display: 'flex', alignItems: 'center' }}
        className={containered ? 'container' : ''}
      >
        {topNavigation && (
          <>
            <Link to="/" className="brand-link" style={{ display: 'contents' }}>
              <StyledBrandImage
                src="/img/acroming.png"
                alt="Acroming Ecuador"
                width={40}
                height={40}
                rounded
              />
              <span
                className="brand-text"
                style={{ color: 'rgba(0, 0, 0, 0.9)' }}
              >
                Acroming Ecaudor
              </span>
              
            </Link>

            <button
              className="navbar-toggler order-1"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </>
        )}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {!topNavigation && (
            <li className="nav-item">
              <button
                onClick={handleToggleMenuSidebar}
                type="button"
                className="nav-link"
              >
                <i className="fas fa-bars" />
              </button>
            </li>
          )}
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              {t('header.label.home')}
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/profile" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
