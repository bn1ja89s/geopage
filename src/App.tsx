//Importación de Módulos
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//Importación de Componentes de la Aplicación
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
//Hooks Personalizados y Utilidades
import { useWindowSize } from '@app/hooks/useWindowSize';
import { calculateWindowSize } from '@app/utils/helpers';
import { setWindowSize } from '@app/store/reducers/ui';
//Google Analytics
import ReactGA from 'react-ga4';
//Paginas
import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';
//Rutas Públicas y Privadas
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
// Manejo de Autenticación - Firebase
import { setCurrentUser } from './store/reducers/auth';
import { firebaseAuth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
//Manejo del Estado con Redux
import { useAppDispatch, useAppSelector } from './store/store';
//Componentes de carga
import { Loading } from './components/Loading';
// Página de Geoportal
import Geoportal from '@pages/geoportal/Geoportal';
import MapaPublico from '@pages/geoportal/MapaPublico';
import ServiciosGeograficos from '@pages/geoportal/ServiciosGeograficos';
import Documentacion from './pages/geoportal/Documentacion';
// Home
import Home from '@app/pages/home/home';
import GeoportalMain from '@modules/GeoportalPublic/GeoportalMain';

// Variables de Entorno
const { VITE_NODE_ENV } = import.meta.env;
//Uso del Estado y Hooks
const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useAppSelector((state) => state.ui.screenSize);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isAppLoading, setIsAppLoading] = useState(true);

  //Autenticacion de Firebase
  useEffect(() => {
    onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (user) {
          dispatch(setCurrentUser(user));
        } else {
          dispatch(setCurrentUser(null));
        }
        setIsAppLoading(false);
      },
      (e) => {
        console.log(e);
        dispatch(setCurrentUser(null));
        setIsAppLoading(false);
      }
    );
  }, []);
  //Cálculo y Actualización del Tamaño de la Pantalla
  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  //Seguimiento de la Navegación con Google Analytics
  useEffect(() => {
    if (location && location.pathname && VITE_NODE_ENV === 'production') {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname,
      });
    }
  }, [location]);
  // Pantalla de Carga - Precargar 

  if (isAppLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Definición de Rutas */}
      {/* Rutas Públicas*/}
      <Routes>
        <Route path="/home" element={<PublicRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>
        {/* Rutas Privadas*/}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
        {/* Rutas Públicas de Geoportal con restriccion de publicRoute

        <Route path="/geoportal" element={<PublicRoute />}>
          <Route path="" element={<GeoportalMain />}>
            <Route path="/geoportal/mapa-publico" element={<MapaPublico />} />
            <Route path="/geoportal/servicios-geograficos" element={<ServiciosGeograficos />} />
            <Route path="/geoportal/documentacion" element={<Documentacion />} />
            {/* Página principal del Geoportal }
            <Route index element={<Geoportal />} />
          </Route>
        </Route>
                */}
        <Route path="/geoportal" element={<GeoportalMain />}>
          <Route index element={<Geoportal />} />
          <Route path="mapa-publico" element={<MapaPublico />} />
          <Route path="servicios-geograficos" element={<ServiciosGeograficos />} />
          <Route path="documentacion" element={<Documentacion />} />
        </Route>

        {/* Ruta para manejar rutas no definidas (404) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Ventana Emergente con 3 segundos */}
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
};

export default App;