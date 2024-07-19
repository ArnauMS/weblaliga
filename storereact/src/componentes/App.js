import '../estilos/App.css';
import data from '../bd.json';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EquipoDetail from './EquipoDetail';
import Clasificacion from './Clasificacion';
import Rankings from './Rankings';

function App() {
  const [equiposOrdenados, setEquiposOrdenados] = useState([]);

  useEffect(() => {
    if (data && data.equipos) {
      const ordenados = [...data.equipos].sort((a, b) => a.nombre.localeCompare(b.nombre));
      setEquiposOrdenados(ordenados);
    }
  }, []);

  return (
    <Router>
      <div className='container'>
        {data ? (
          <>
            <div className='container-escudos'>
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
      </div>
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
