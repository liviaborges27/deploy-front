import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export function PHome(): JSX.Element {
  return (
    <section className="page-shell home-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--light">Painel administrativo</p>
          <h1>SISTEMA DE GESTÃO FARMACÊUTICA</h1>
          <p className="page-subtitle">
            Controle completo de clientes, produtos e estoque em uma interface operacional, clara e eficiente.
          </p>
        </div>

        <div className="hero-actions">
          <Link to="/clientes" className="btn btn-primary btn-home-primary">
            + Gerenciar Clientes
          </Link>
          <Link to="/produtos" className="btn btn-home-secondary">
            + Gerenciar Produtos
          </Link>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-topline">
            <span className="stat-kicker">Clientes</span>
            <span className="stat-badge">Ativo</span>
          </div>
          <strong>Gestão de Clientes</strong>
          <p>Cadastre, atualize e acompanhe registros com organização e rapidez.</p>
          <Link to="/clientes" className="stat-link">
            Acessar clientes
          </Link>
        </article>

        <article className="stat-card">
          <div className="stat-topline">
            <span className="stat-kicker">Estoque</span>
            <span className="stat-badge">Catalogo</span>
          </div>
          <strong>Controle de Estoque</strong>
          <p>Monitore itens em estoque, preços e disponibilidade do catálogo.</p>
          <Link to="/produtos" className="stat-link">
            Acessar produtos
          </Link>
        </article>

        <article className="stat-card">
          <div className="stat-topline">
            <span className="stat-kicker">Segurança</span>
            <span className="stat-badge stat-badge--alert">Alertas</span>
          </div>
          <strong>Sinalizador de Segurança</strong>
          <p>Identifique itens próximos do estoque mínimo antes que afetem a operação.</p>
          <Link to="/produtos" className="stat-link">
            Revisar alertas
          </Link>
        </article>
      </section>

      <section className="quick-actions">
        <article className="quick-card quick-card--clients">
          <div className="quick-card__content">
            <p className="eyebrow">Fluxo de clientes</p>
            <h2>Clientes</h2>
            <p>Visualize, cadastre e mantenha os dados de cada paciente ou cliente em um único lugar.</p>
          </div>
          <Link to="/clientes" className="quick-card__link">
            Acessar tabela
          </Link>
        </article>

        <article className="quick-card quick-card--products">
          <div className="quick-card__content">
            <p className="eyebrow">Fluxo de produtos</p>
            <h2>Produtos</h2>
            <p>Controle do catálogo com preços, validade e quantidade em estoque em um painel claro.</p>
          </div>
          <Link to="/produtos" className="quick-card__link">
            Acessar tabela
          </Link>
        </article>
      </section>
    </section>
  );
}
