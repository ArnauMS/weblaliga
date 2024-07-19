import React, { useEffect, useState } from 'react';  
import data from '../bd.json';
import '../estilos/Clasificacion.css';
import { Link } from 'react-router-dom';

function Clasificacion() {
  const [equiposOrdenados, setEquiposOrdenados] = useState([]);

  useEffect(() => {
    if (data && data.equipos) {
      const ordenados = [...data.equipos].sort((a, b) => b.puntos - a.puntos);
      setEquiposOrdenados(ordenados);
    }
  }, []);

  return (
    <div className="container-clasificacion">
      <div className="logo-container-clasificacion">
        <h1>Clasificación de LaLiga 23/24</h1>
        <img className="logo-clasificacion" src={data.logo} alt={`${data.liga} logo`} />
      </div>
      <table className='tabla-clasificacion'>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Equipo</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
            <th>DG</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {equiposOrdenados.map((equipo, index) => (
            <tr key={equipo.nombre}>
              <td>{index + 1}</td>
              <td >
                <Link key={equipo.nombre} to={`/equipo/${equipo.nombre}`} className="equipo-container-clasificacion">
                  <img className="escudo-clasificacion" src={equipo.escudo} alt={`${equipo.nombre} escudo`} />
                  {equipo.nombre}
                </Link>
              </td>
              <td>{equipo.partidos_jugados}</td>
              <td>{equipo.victorias}</td>
              <td>{equipo.empates}</td>
              <td>{equipo.derrotas}</td>
              <td>{equipo.goles_a_favor}</td>
              <td>{equipo.goles_en_contra}</td>
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