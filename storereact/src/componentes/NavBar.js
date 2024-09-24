import React, { useState, useEffect, useRef  } from 'react';
import { Link } from 'react-router-dom';
import data from '../bd.json';
import '../estilos/NavBar.css';

function NavBar() {
  const [equiposOrdenados, setEquiposOrdenados] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Función para alternar el menú móvil
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (data && data.equipos) {
      const ordenados = [...data.equipos].sort((a, b) => a.nombre.localeCompare(b.nombre));
      setEquiposOrdenados(ordenados);
    }

    // Cerrar el menu al hacer click fuera de él o en el boton del menu
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Para evitar que se pueda hacer scroll en la página cuando el menú móvil esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  return (
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

      <div ref={hamburgerRef} className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div ref={menuRef} className={`container-escudos-movil ${isOpen ? 'active' : ''}`}>
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
  );
}

export default NavBar;
