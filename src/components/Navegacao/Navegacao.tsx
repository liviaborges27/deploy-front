import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Navegacao.css';

export function Navegacao(): JSX.Element {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <strong>Farmácia</strong>
      </div>

      <nav className="topbar__nav" aria-label="Menu principal">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/clientes">Clientes</NavLink>
        <NavLink to="/produtos">Produtos</NavLink>
      </nav>
    </header>
  );
}
