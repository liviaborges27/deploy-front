import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export function PHome(): JSX.Element {
  return (
    <section className="page-shell home-shell">
      <div className="hero-panel">
        <p className="eyebrow">Painel administrativo</p>
        <h1>Farmácia Saúde +</h1>
        <p className="page-subtitle">
          Centralize o cadastro de clientes e o controle de produtos do seu estabelecimento com rapidez e organização.
        </p>

        <div className="hero-actions">
          <Link to="/clientes/cadastro" className="btn btn-primary">
            Cadastrar cliente
          </Link>
          <Link to="/produtos/cadastro" className="btn btn-secondary">
            Cadastrar produto
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Clientes</span>
          <strong>Gestão completa</strong>
          <small>Cadastro, atualização e visualização.</small>
        </div>
        <div className="stat-card">
          <span>Produtos</span>
          <strong>Estoque saudável</strong>
          <small>Controle de preços e quantidade.</small>
        </div>
        <div className="stat-card">
          <span>Fácil uso</span>
          <strong>Interface moderna</strong>
          <small>Design intuitivo, responsivo e limpo.</small>
        </div>
      </div>
    </section>
  );
}
