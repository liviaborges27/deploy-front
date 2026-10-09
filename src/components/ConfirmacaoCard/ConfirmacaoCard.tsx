import type { JSX } from 'react';

type ConfirmacaoCardProps = {
  titulo: string;
  descricao: string;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export function ConfirmacaoCard({ titulo, descricao, onConfirmar, onCancelar }: ConfirmacaoCardProps): JSX.Element {
  return (
    <div className="confirmacao-card">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <div className="confirmacao-card__acoes">
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirmar}>
          Confirmar
        </button>
      </div>
    </div>
  );
}
