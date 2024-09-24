import React from 'react';
import { NavLink } from 'react-router-dom'; // Para manejar la navegación
import { useTranslation } from 'react-i18next'; // Para manejar la traducción si es necesario
import HeaderHome from '@app/modules/home/HeaderHome'; // Componente del Header (Navbar)
import BodyHome from '@app/modules/home/BodyHome';
import FooterHome from '@app/modules/home/FooterHome';
// Componente Home
const Home = () => {
  const [t] = useTranslation(); // Para manejar la traducción del contenido

  return (
    <div className="wrapper">
      {/* Navbar */}
      <HeaderHome />
      {/* Cuerpo del Home */}
      <BodyHome />
      {/* Pie de página */}
      <FooterHome/>
    </div>
  );
};

export default Home;
