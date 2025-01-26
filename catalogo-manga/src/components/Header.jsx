import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../style/Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="site-title">Catálogo de Mangás</h1>
      <nav className="nav-buttons">
        <NavLink
          to="/myspace"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Minha Coleção
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Desejos
        </NavLink>
        <NavLink
          to="/finance"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Financeiro
        </NavLink>
        <button className="add-button" onClick={() => navigate('/collection')}>
          ADICIONAR
        </button>
      </nav>
    </header>
  );
};

export default Header;
