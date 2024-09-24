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

import ControlSidebar from '@app/modules/main/control-sidebar/ControlSidebar';
import Header from '@app/modules/main/header/Header';
import Footer from '@app/modules/main/footer/Footer';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import MenuSidebar from '@app/modules/main/menu-sidebar/MenuSidebar';
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
    const layoutBoxed = useAppSelector((state) => state.ui.layoutBoxed);
    const screenSize = useAppSelector((state) => state.ui.screenSize);
    const topNavigation = useAppSelector((state) => state.ui.topNavigation);
    return (
        <>
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



            

            <h1>Geoportal</h1>
            
            {/* Aquí puedes agregar más contenido específico para el geoportal */}
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
};

export default GeoportalMain;