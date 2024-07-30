import '../estilos/App.css';
import data from '../bd.json';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EquipoDetail from './EquipoDetail';
import Clasificacion from './Clasificacion';
import Rankings from './Rankings';

function App() {
  const [equiposOrdenados, setEquiposOrdenados] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Funcion para detectar si el menu esta abierto o cerrado cuando el menu de movil esta activado
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (data && data.equipos) {
      const ordenados = [...data.equipos].sort((a, b) => a.nombre.localeCompare(b.nombre));
      setEquiposOrdenados(ordenados);
    }
  }, []);

  return (
    <Router>
        {data ? (
          <>
            <div className='container'>
              <div className='container-escudos-ordenador'>
                <Link key={"LaLiga"} to={'/'} className="logo-container">
                  <img className="logo" src={data.logo} alt={`${data.liga} logo`} />
                  <h1 className='nombre-liga'>{data.liga}</h1>
                </Link>
                {equiposOrdenados.map((equipo) => (
                  <Link key={equipo.nombre} to={`/equipo/${equipo.nombre}`} className="escudo-container">
                    <img className="escudo" src={equipo.escudo} alt={`${equipo.nombre} escudo`} />
                  </Link>
                ))}
              </div>
              <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={`container-escudos-movil ${isOpen ? 'active' : ''}`}>
                <Link key={"LaLiga"} to={'/'} className="logo-container-movil">
                  <img className="logo" src={data.logo} alt={`${data.liga} logo`} />
                  <p className='nombre-liga-movil'><b>{data.liga}</b></p>
                </Link>
                {equiposOrdenados.map((equipo) => (
                  <Link key={equipo.nombre} to={`/equipo/${equipo.nombre}`} className="escudo-container-movil">
                    <img className="escudo" src={equipo.escudo} alt={`${equipo.nombre} escudo`} />
                    <p>{equipo.nombre}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className='container-background'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/equipo/:nombre" element={<EquipoDetail equipos={equiposOrdenados} />} />
              </Routes>
            </div>
          </>
        ) : (
          <p>Cargando...</p>
        )}
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <Clasificacion />
      <Rankings />
    </div>
  );
}

export default App;
