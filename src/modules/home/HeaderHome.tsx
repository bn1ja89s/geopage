import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { Image } from '@profabric/react-components';
import { useAppSelector } from '@app/store/store';

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  opacity: 1;
  margin: -1px 4px 0 6px;

  &:hover {
    color: inherit;
  }
`;

const HeaderHome = ({ containered, ...rest }: { containered?: boolean } & any) => {
  const [t] = useTranslation();
  const navbarVariant = useAppSelector((state) => state.ui.navbarVariant);
  const headerBorder = useAppSelector((state) => state.ui.headerBorder);
  const topNavigation = true;

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
                Acroming Ecuador
              </span>
            </Link>

            {/* Botón de colapso responsivo */}
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

        {/* Elementos del menú colapsables */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/" className="nav-link">
                {t('header.label.home')}
              </Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/services" className="nav-link">
                Servicios
              </Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/about-us" className="nav-link">
                Quienes Somos
              </Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/contact" className="nav-link">
                Contacto
              </Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/blog" className="nav-link">
                Blog
              </Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/geoportal" className="btn btn-success">
                Geoportal
              </Link>
            </li>
            {/* Botones de Iniciar Sesión y Registrarse */}
            <li className="nav-item">
              <Link to="/login" className="btn btn-primary ml-2">
                Iniciar Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="btn btn-outline-secondary ml-2">
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderHome;
