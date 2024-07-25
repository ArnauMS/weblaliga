import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../bd.json';
import '../estilos/Rankings.css';

function Rankings() {
    const [goleadoresOrdenados, setGoleadoresOrdenados] = useState([]);
    const [asistentesOrdenados, setAsistentesOrdenados] = useState([]);
    const [showMoreGoleadores, setShowMoreGoleadores] = useState(false);
    const [showMoreAsistentes, setShowMoreAsistentes] = useState(false);
    const [pantallaPequeña, setPantallaPequeña] = useState(window.innerWidth < 700);
  
    useEffect(() => {
      if (data && data.goleadores) {
        const ordenadosGoleadores = [...data.goleadores].sort((a, b) => b.goles - a.goles);
        setGoleadoresOrdenados(ordenadosGoleadores);
      }
  
      if (data && data.asistentes) {
        const ordenadosAsistentes = [...data.asistentes].sort((a, b) => b.asistencias - a.asistencias);
        setAsistentesOrdenados(ordenadosAsistentes);
      }
    }, []);

    useEffect(() => {
      const redimension = () => setPantallaPequeña(window.innerWidth < 700);
      window.addEventListener('resize', redimension);
      return () => window.removeEventListener('resize', redimension);
    }, []);
  
    const displayedGoleadores = showMoreGoleadores ? goleadoresOrdenados : goleadoresOrdenados.slice(0, 5);
    const displayedAsistentes = showMoreAsistentes ? asistentesOrdenados : asistentesOrdenados.slice(0, 5);  

  return (
    <div className="rankings-container">
      <div className="tabla-goleadores">
        <h2>Máximos Goleadores</h2>
        <table className="tabla">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Equipo</th>
              <th>Goles</th>
            </tr>
          </thead>
          <tbody>
            {displayedGoleadores.map((jugador, index) => (
              <tr key={index} className="jugador-item">
                <td>
                  <div className='div-jugador'>
                      <img src={jugador.foto} alt={jugador.nombre} className="jugador-foto" />
                      {jugador.nombre}
                  </div>                  
                </td>
                <td>
                  <Link key={jugador.equipo} to={`/equipo/${jugador.equipo}`} className='div-equipo'>
                    <img src={jugador.escudo} alt={jugador.equipo} className="jugador-escudo" />
                    {pantallaPequeña ? jugador.abreviatura : jugador.equipo}
                  </Link>                  
                </td>
                <td><b>{jugador.goles}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setShowMoreGoleadores(!showMoreGoleadores)}>
          {showMoreGoleadores ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      </div>
      <div className="tabla-asistentes">
        <h2>Máximos Asistentes</h2>
        <table className="tabla">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Equipo</th>
              {!pantallaPequeña ? (
                <th>Asistencias</th>
              ) : (
                <th>Asistencias</th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayedAsistentes.map((jugador, index) => (
              <tr key={index} className="jugador-item">
                <td>
                  <div className='div-jugador'>
                      <img src={jugador.foto} alt={jugador.nombre} className="jugador-foto" />
                      {jugador.nombre}
                  </div>                  
                </td>
                <td>
                  <Link key={jugador.equipo} to={`/equipo/${jugador.equipo}`} className='div-equipo'>
                    <img src={jugador.escudo} alt={jugador.equipo} className="jugador-escudo" />
                    {pantallaPequeña ? jugador.abreviatura : jugador.equipo}
                  </Link>                  
                </td>
                <td><b>{jugador.asistencias}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setShowMoreAsistentes(!showMoreAsistentes)}>
          {showMoreAsistentes ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      </div>
    </div>
  );
}

export default Rankings;
