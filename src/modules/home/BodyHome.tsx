import React from 'react';
import { Link } from 'react-router-dom';
import { openpit,personas,exploracion,ug,rm,emm } from './ImgHome';


const BodyHome = () => {
  return (
    <div className="container">
      {/* Sección de encabezado con imagen */}
      <div className="row mt-5 header-section-home"
      style={{
        backgroundImage: `url(${openpit})`
      }}>
        <div className="col-md-12 text-center">
          <h1 className="display-4">Acroming Ecuador</h1>
          <p className="lead">
          Servicios Profesionales de Ingeniería para Minería, Geología, Ingeniería Civil, Topografía y Cartografía.
          </p>
          <Link to="/services" className="btn btn-primary">
            Nuestros Servicios
          </Link>
        </div>
      </div>

      {/* Sección de "Expert Solutions" */}
      <div className="row my-5">
        <div className="col-md-6">
          <h2>Soluciones innovadoras para sus proyectos</h2>
          <p>
            Acroming Ecuador brinda servicios de consultoría de ingeniería de primer nivel en Quito, entregando soluciones innovadoras para una variedad de proyectos. Nuestro equipo de expertos garantiza la excelencia en todos los aspectos de su proyecto, desde el diseño hasta la implementación.
          </p>
          <Link to="/contact" className="btn btn-info">Contactanos</Link>
        </div>
        <div className="col-md-6">
          <img src={personas} alt="Consulting team" className="img-fluid" />
        </div>
      </div>

      {/* Sección de Servicios */}
      <div id="services" className="row my-5">
        <div className="col-md-12 text-center">
          <h2>Soluciones integrales de ingeniería</h2>
          <p className="lead">
          Ofrecemos una amplia gama de servicios de ingeniería diseñados para satisfacer sus necesidades específicas. Desde el análisis estructural hasta la gestión de proyectos, brindamos soluciones integrales para garantizar el éxito de su proyecto.
          </p>
        </div>
        {/* Servicios individuales */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img src={exploracion} className="card-img-top" alt="Structural engineering" />
            <div className="card-body">
              <h5 className="card-title">Structural engineering</h5>
              <p className="card-text">
                Expert structural analysis and design solutions for buildings and infrastructure projects.
              </p>
              <Link to="/services/structural-engineering" className="btn btn-primary">Leer más</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img src={ug} className="card-img-top" alt="Geotechnical engineering" />
            <div className="card-body">
              <h5 className="card-title">Geotechnical engineering</h5>
              <p className="card-text">
                Specialized geotechnical solutions for soil mechanics and foundation design.
              </p>
              <Link to="/services/geotechnical-engineering" className="btn btn-primary">Leer más</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img src={rm} className="card-img-top" alt="Environmental consulting" />
            <div className="card-body">
              <h5 className="card-title">Environmental consulting</h5>
              <p className="card-text">
                Comprehensive environmental assessment and sustainability strategies.
              </p>
              <Link to="/services/environmental-consulting" className="btn btn-primary">Leer más</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Contacto */}
      <div id="contact" className="row my-5">
        <div className="col-md-6">
          <h2>Hablemos de tu proyecto</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" className="form-control" id="name" placeholder="Jane Smith" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="email@website.com" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono Celular</label>
              <input type="text" className="form-control" id="phone" placeholder="555-555-5555" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea className="form-control" id="message" rows={3} placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>

        <div className="col-md-6">
          <h2>Ponte en contacto</h2>
          <p>Email: info@acroming.com</p>
          <p>Dirección: Quito, Pichincha, Ecuador</p>
          <p>Horario: Lunes - Viernes, 9am - 6pm</p>
          <div className="map-placeholder">
            <p><em>Mapa</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyHome;
