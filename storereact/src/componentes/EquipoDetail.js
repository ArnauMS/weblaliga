import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../estilos/EquipoDetail.css';
import data from '../bd.json';

const EquipoDetail = () => {
  const [porteros, setPorteros] = useState([]);
  const [defensas, setDefensas] = useState([]);
  const [centrocampistas, setCentrocampistas] = useState([]);
  const [delanteros, setDelanteros] = useState([]);
  const { nombre } = useParams();
  const equipos = data.equipos || [];
  const equipo = equipos.find(equipo => equipo.nombre === nombre);

  useEffect(() => {
    if (equipo && equipo.plantilla && equipo.plantilla.jugadores) {
      setPorteros(equipo.plantilla.jugadores.filter(jugador => jugador.posicion === "Portero"));
      setDefensas(equipo.plantilla.jugadores.filter(jugador => jugador.posicion === "Defensa"));
      setCentrocampistas(equipo.plantilla.jugadores.filter(jugador => jugador.posicion === "Centrocampista"));
      setDelanteros(equipo.plantilla.jugadores.filter(jugador => jugador.posicion === "Delantero"));
    }
  }, [equipo]);

  if (!equipo) {
    return <p>Equipo no encontrado</p>;
  }

  return (
    <div className='container-jugadores'>
      <h1 className='section-title'>Porteros</h1>
      <div className='jugadores-section'>
        {porteros.map((portero) => (
          <div key={portero.nombre} className='jugador-card'>
            <img src={portero.foto} alt={portero.nombre} />
            <h3 className='nombre'>{portero.nombre}</h3>
          </div>
        ))}
      </div>

      <h1 className='section-title'>Defensas</h1>
      <div className='jugadores-section'>
        {defensas.map((defensa) => (
          <div key={defensa.nombre} className='jugador-card'>
            <img src={defensa.foto} alt={defensa.nombre} />
            <h3 className='nombre'>{defensa.nombre}</h3>
          </div>
        ))}
      </div>

      <h1 className='section-title'>Centrocampistas</h1>
      <div className='jugadores-section'>
        {centrocampistas.map((centrocampista) => (
          <div key={centrocampista.nombre} className='jugador-card'>
            <img src={centrocampista.foto} alt={centrocampista.nombre} />
            <h3 className='nombre'>{centrocampista.nombre}</h3>
          </div>
        ))}
      </div>

      <h1 className='section-title'>Delanteros</h1>
      <div className='jugadores-section'>
        {delanteros.map((delantero) => (
          <div key={delantero.nombre} className='jugador-card'>
            <img src={delantero.foto} alt={delantero.nombre} />
            <h3 className='nombre'>{delantero.nombre}</h3>
          </div>
        ))}
      </div>

      <h1 className='section-title'>Entrenador</h1>
      <div className='jugadores-section'>
        <div className='jugador-card'>
          <img src={equipo.plantilla.entrenador.foto} alt={equipo.plantilla.entrenador.nombre} />
          <h3 className='nombre'>{equipo.plantilla.entrenador.nombre}</h3>
        </div>
      </div>
    </div>
  );
};

export default EquipoDetail;
