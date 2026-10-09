import type { JSX } from 'react';

type AlertCardProps = {
  tipo?: 'sucesso' | 'erro' | 'info';
  mensagem: string;
  onClose?: () => void;
};

export function AlertCard({ tipo = 'info', mensagem, onClose }: AlertCardProps): JSX.Element {
  const tipoClasse = {
    sucesso: 'alert-card alert-card--sucesso',
    erro: 'alert-card alert-card--erro',
    info: 'alert-card alert-card--info',
  };

  return (
    <div className={tipoClasse[tipo]} role="alert">
      <span>{mensagem}</span>
      {onClose ? (
        <button type="button" className="alert-card__close" onClick={onClose} aria-label="Fechar alerta">
          ×
        </button>
      ) : null}
    </div>
  );
}
