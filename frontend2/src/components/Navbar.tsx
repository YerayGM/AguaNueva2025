import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/datos-personales">Datos Personales</Link></li>
        <li><Link to="/expedientes">Expedientes</Link></li>
        <li><Link to="/materia">Materia</Link></li>
        <li><Link to="/municipios">Municipios</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;