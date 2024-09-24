//Modulos
// Importación de los hooks de React, la acción de Redux y funciones auxiliares
import { useState, useEffect, useCallback, useRef } from 'react';
//Redux Acción
import { toggleSidebarMenu } from '@app/store/reducers/ui';
//Funciones Auxiliares
import {
  addWindowClass, // Añade una clase al body del documento
  removeWindowClass, // Elimina una clase del body del documento
  scrollbarVisible, // Detecta si la barra de desplazamiento es visible
} from '@app/utils/helpers';
//Componentes Importados
import ControlSidebar from '@app/modules/main/control-sidebar/ControlSidebar';// Componente de la barra de control lateral
import Header from '@app/modules/main/header/Header';// Componente del encabezado
import Footer from '@app/modules/main/footer/Footer';// Componente del pie de página
// Hooks para manejar el estado global con Redux
import { useAppDispatch, useAppSelector } from '@app/store/store';
// Componente del menú lateral
import MenuSidebar from './menu-sidebar/MenuSidebar';
// Styled-components para crear componentes con estilos dinámicos
import { styled } from 'styled-components';
// Componente que renderiza rutas anidadas
import { Outlet } from 'react-router-dom';
// Componente que muestra una pantalla de carga
import { Loading } from '@app/components/Loading';

// Definición del ancho del menú lateral
const MENU_WIDTH = 250;
// Componente contenedor con estilo dinámico basado en la visibilidad de la barra de desplazamiento
export const Container = styled.div<{ $isScrollbarVisible: boolean }>`
  min-height: 100%;
  ${(props) =>
    `width: calc(100% - ${props.$isScrollbarVisible ? '16px' : '0px'});`};
`;

//Lógica y Estructura del Componente
const Main = () => {
  const dispatch = useAppDispatch();
  //Indica si el menú lateral está colapsado.
  const menuSidebarCollapsed = useAppSelector(
    (state) => state.ui.menuSidebarCollapsed
  );
  //Indica si la barra de control está colapsada.
  const controlSidebarCollapsed = useAppSelector(
    (state) => state.ui.controlSidebarCollapsed
  );
  //Determina si el diseño está en formato en caja (boxed).
  const layoutBoxed = useAppSelector((state) => state.ui.layoutBoxed);
  //Indica si la barra de navegación superior está activa.
  const topNavigation = useAppSelector((state) => state.ui.topNavigation);

  // Indica el tamaño de la pantalla (usado para adaptarse a pantallas pequeñas, medianas o grandes).
  const screenSize = useAppSelector((state) => state.ui.screenSize);
  // Indica el tamaño de la pantalla (usado para adaptarse a pantallas pequeñas, medianas o grandes).
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  //Estados Locales
  //Para determinar si la app está cargada y si la barra de desplazamiento es visible

  //Inicialmente es false, y cambia a true cuando el usuario está autenticado.
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  //Estado que almacena si la barra de desplazamiento es visible.
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);


  //Referenciar elementos DOM directamente.
  const mainRef = useRef<HTMLDivElement | undefined>();

  //Función para Alternar el Menú Lateral - Función para alternar el estado del menú lateral
  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };

  //Efecto que actualiza el estado de carga de la app basado en el usuario actual
  useEffect(() => {
    setIsAppLoaded(Boolean(currentUser));
  }, [currentUser]);

  // Efecto que añade y elimina clases del body cuando el componente se monta/desmonta
  useEffect(() => {
    removeWindowClass('register-page');
    removeWindowClass('login-page');
    removeWindowClass('hold-transition');

    addWindowClass('sidebar-mini');

    //Cleanup cuando el componente se desmonta
    // fetchProfile(); 
    return () => {
      removeWindowClass('sidebar-mini');
    };
  }, []);

  // Efecto que controla el estado colapsado del menú lateral según el tamaño de pantalla
  // Añade o elimina las clases 
  useEffect(() => {
    removeWindowClass('sidebar-closed');
    removeWindowClass('sidebar-collapse');
    removeWindowClass('sidebar-open');
    if (menuSidebarCollapsed && screenSize === 'lg') {
      addWindowClass('sidebar-collapse');
    } else if (menuSidebarCollapsed && screenSize === 'xs') {
      addWindowClass('sidebar-open');
    } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
      addWindowClass('sidebar-closed');
      addWindowClass('sidebar-collapse');
    }
  }, [screenSize, menuSidebarCollapsed]);

  // Efecto que controla el estado colapsado de la barra de control lateral
  useEffect(() => {
    if (controlSidebarCollapsed) {
      removeWindowClass('control-sidebar-slide-open');
    } else {
      addWindowClass('control-sidebar-slide-open');
    }
  }, [screenSize, controlSidebarCollapsed]);

  // Función que actualiza la visibilidad de la barra de desplazamiento
  const handleUIChanges = () => {
    setIsScrollbarVisible(scrollbarVisible(window.document.body));
  };

  // Añade los eventos de scroll y resize para actualizar la interfaz cuando cambian
  useEffect(() => {
    window.document.addEventListener('scroll', handleUIChanges);
    window.document.addEventListener('resize', handleUIChanges);

    // Cleanup cuando los eventos se eliminan
    return () => {
      window.document.removeEventListener('scroll', handleUIChanges);
      window.document.removeEventListener('resize', handleUIChanges);
    };
  }, []);

  //Llamar a handleUIChanges Cuando el Contenedor Principal Cambia
  useEffect(() => {
    handleUIChanges();
  }, [mainRef.current]);

  // Función que devuelve la plantilla de la aplicación, según si está cargada o no
  const getAppTemplate = useCallback(() => {
    if (!isAppLoaded) {
      return <Loading />;// Muestra la pantalla de carga si la app aún no está cargada
    }
    return (
      <>
      {/* Encabezado con márgenes dinámicos basados en el estado de la pantalla y la navegación superior */}
        <Header
          containered={layoutBoxed}
          style={{
            marginLeft: !['sm', 'xs'].includes(screenSize)
              ? topNavigation
                ? '0px'
                : `${MENU_WIDTH}px`
              : '0px',
          }}
        />
        {/* Si la navegación superior no está activa, muestra el menú lateral */}
        {!topNavigation && <MenuSidebar />}
        {/* Contenido principal de la aplicación */}
        <div
          ref={mainRef as any}
          className="content-wrapper"
          style={{
            marginLeft: !['sm', 'xs'].includes(screenSize)
              ? topNavigation
                ? '0px'
                : `${MENU_WIDTH}px`
              : '0px',
          }}
        >
          <section className="content">
            <div className={layoutBoxed ? 'container' : ''}>
              <Outlet />{/* Renderiza las rutas anidadas */}
            </div>
          </section>
        </div>
        {/* Pie de página */}
        {/* <Content  containered={layoutBoxed} /> */}
        <Footer
          containered={layoutBoxed}
          style={{
            marginLeft:
            !['sm', 'xs'].includes(screenSize)                
                  ? topNavigation
                  ? '0px'
                  : `${MENU_WIDTH}px`
                : '0px',
          }}
        />
        <ControlSidebar />{/* Barra lateral de control */}
        {/* Overlay que se muestra cuando el menú lateral está colapsado en pantallas pequeñas */}
        <div
          id="sidebar-overlay"
          role="presentation"
          onClick={handleToggleMenuSidebar}
          onKeyDown={() => {}}
          style={{
            display:
              screenSize === 'sm' && menuSidebarCollapsed ? 'block' : undefined,
          }}
        />
      </>
    );
  }, [
    isAppLoaded,
    menuSidebarCollapsed,
    screenSize,
    layoutBoxed,
    topNavigation,
  ]);
  // Renderizado final del componente
  return (
    <Container $isScrollbarVisible={isScrollbarVisible} className="wrapper">
      {getAppTemplate()}
    </Container>
  );
};

export default Main;
