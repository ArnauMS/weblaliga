import React, { useEffect, useState } from 'react';  
import data from '../bd.json';
import '../estilos/Clasificacion.css';
import { Link } from 'react-router-dom';

function Clasificacion() {
  const [equiposOrdenados, setEquiposOrdenados] = useState([]);
  const [pantallaPequeña, setPantallaPequeña] = useState(window.innerWidth < 850);
  const [pantallaPequeñaTitulo, setPantallaPequeñaTitulo] = useState(window.innerWidth < 586);

  useEffect(() => {
    if (data && data.equipos) {
      const ordenados = [...data.equipos].sort((a, b) => b.puntos - a.puntos);
      setEquiposOrdenados(ordenados);
    }
  }, []);

  useEffect(() => {
    const redimension = () => {
      setPantallaPequeña(window.innerWidth < 850);
      setPantallaPequeñaTitulo(window.innerWidth < 586);
    };
    window.addEventListener('resize', redimension);
    return () => {
      window.removeEventListener('resize', redimension);
    };
  }, []);

  return (
    <div className="container-clasificacion">
      <div className="logo-container-clasificacion">
        {!pantallaPequeñaTitulo ? (
          <h1>Clasificación LaLiga 23/24</h1>
        ) : (
          <div>
            <h1>Clasificación</h1>
            <h1>LaLiga 23/24</h1>
          </div>
        )}        
        <img className="logo-clasificacion" src={data.logo} alt={`${data.liga} logo`} />
      </div>
      <table className='tabla-clasificacion'>
        <thead>
          <tr>
            {!pantallaPequeña ? (
              <th>Posición</th>
            ) : (
              <th>POS</th>
            )}
            <th className='equipo-columna'>Equipo</th>
            <th className='pj-columna'>PJ</th>
            {!pantallaPequeña && (
              <th>PG</th>
            )}
            {!pantallaPequeña && (
              <th>PE</th>
            )}
            {!pantallaPequeña && (
              <th>PP</th>
            )}
            {!pantallaPequeña && (
              <th>GF</th>
            )}
            {!pantallaPequeña && (
              <th>GC</th>
            )}            
            <th>DG</th>
            {!pantallaPequeña ? (
              <th>Puntos</th>
            ) : (
              <th>PTS</th>
            )}
          </tr>
        </thead>
        <tbody>
          {equiposOrdenados.map((equipo, index) => (
            <tr key={equipo.nombre}>
              <td>{index + 1}</td>
              <td className='equipo-columna'>
                <Link key={equipo.nombre} to={`/equipo/${equipo.nombre}`} className="equipo-container-clasificacion">
                  <img className="escudo-clasificacion" src={equipo.escudo} alt={`${equipo.nombre} escudo`} />
                  {pantallaPequeña ? equipo.abreviatura : equipo.nombre}
                </Link>
              </td>
              <td className='pj-columna'>{equipo.partidos_jugados}</td>
              {!pantallaPequeña && (
                <td>{equipo.victorias}</td>
              )}
              {!pantallaPequeña && (
                <td>{equipo.empates}</td>
              )}
              {!pantallaPequeña && (
                <td>{equipo.derrotas}</td>
              )}
              {!pantallaPequeña && (
                <td>{equipo.goles_a_favor}</td>
              )}
              {!pantallaPequeña && (
              <td>{equipo.goles_en_contra}</td>
              )}
              <td>{equipo.diferencia_de_goles}</td>
              <td><b>{equipo.puntos}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Clasificacion;