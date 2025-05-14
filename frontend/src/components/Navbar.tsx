import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/globals.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><NavLink to="/datos-personales" className={({ isActive }) => isActive ? "active-link" : undefined}>Datos Personales</NavLink></li>
        <li><NavLink to="/expedientes" className={({ isActive }) => isActive ? "active-link" : undefined}>Expedientes</NavLink></li>
        <li><NavLink to="/expedientes/new" className={({ isActive }) => isActive ? "active-link" : undefined}>Nuevo Expediente</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;