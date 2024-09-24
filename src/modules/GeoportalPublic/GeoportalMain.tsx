//Modulos
// Importación de los hooks de React, la acción de Redux y funciones auxiliares
import { useState, useEffect, useCallback, useRef } from 'react';
//Redux Acción
import { toggleSidebarMenu } from '@app/store/reducers/ui';
//Funciones Auxiliare
import {
    addWindowClass, // Añade una clase al body del documento
    removeWindowClass, // Elimina una clase del body del documento
    scrollbarVisible, // Detecta si la barra de desplazamiento es visible
} from '@app/utils/helpers';


import HeaderGeoPublic from '@app/modules/GeoportalPublic/HeaderGeoPublic';
import Footer from '@app/modules/main/footer/Footer';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import MenuSidebarGeoPublic from '@app/modules/GeoportalPublic/MenuSidebarGeoPublicAux';
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

const GeoportalMain = () => {
    const dispatch = useAppDispatch();
    const menuSidebarCollapsed = useAppSelector((state) => state.ui.menuSidebarCollapsed);
    const layoutBoxed = useAppSelector((state) => state.ui.layoutBoxed);
    const screenSize = useAppSelector((state) => state.ui.screenSize);
    const topNavigation = useAppSelector((state) => state.ui.topNavigation);
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    const [isAppLoaded, setIsAppLoaded] = useState(true); // Asume que la aplicación está cargada
    const mainRef = useRef<HTMLDivElement | undefined>();

    // Función para alternar el menú lateral
    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    // Controla el estado de la barra de desplazamiento
    const handleUIChanges = () => {
        setIsScrollbarVisible(scrollbarVisible(window.document.body));
    };

    // Añade o elimina clases del body según el estado del menú y la pantalla
    useEffect(() => {
        addWindowClass('sidebar-mini');
        return () => {
            removeWindowClass('sidebar-mini');
        };
    }, []);

    // Actualiza la visibilidad del scrollbar cuando cambia la interfaz
    useEffect(() => {
        window.document.addEventListener('scroll', handleUIChanges);
        window.document.addEventListener('resize', handleUIChanges);
        return () => {
            window.document.removeEventListener('scroll', handleUIChanges);
            window.document.removeEventListener('resize', handleUIChanges);
        };
    }, []);

    // Renderiza la plantilla general del geoportal público
    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return <Loading />; // Muestra una pantalla de carga si no está lista
        }
        return (
            <>
                {/* Header público */}
                <HeaderGeoPublic
                    containered={layoutBoxed}
                    style={{
                        marginLeft: !['sm', 'xs'].includes(screenSize)
                            ? topNavigation
                                ? '0px'
                                : `${MENU_WIDTH}px`
                            : '0px',
                    }}
                />
                {/* Menú lateral público */}
                <MenuSidebarGeoPublic />

                {/* Contenido principal, renderiza las páginas públicas con <Outlet /> */}
                <div
                    ref={mainRef as any}
                    className="content-wrapper"
                    style={{
                        marginLeft: menuSidebarCollapsed ? '0px' : `${MENU_WIDTH}px`,
                    }}
                >
                    <section className="content">
                        <div className={layoutBoxed ? 'container' : ''}>
                            <Outlet /> {/* Aquí se renderizan las páginas públicas dinámicamente */}
                        </div>
                    </section>
                </div>

                {/* Pie de página */}
                <Footer
                    containered={layoutBoxed}
                    style={{
                        marginLeft:
                            !['sm', 'xs'].includes(screenSize) ? topNavigation
                                ? '0px'
                                : `${MENU_WIDTH}px`
                                : '0px',
                    }}
                />
            </>
        );
    }, [isAppLoaded, menuSidebarCollapsed, layoutBoxed]);

    return (
        <Container $isScrollbarVisible={isScrollbarVisible} className="wrapper">
            {getAppTemplate()}
        </Container>
    );
};

export default GeoportalMain;