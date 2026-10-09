import type { JSX } from 'react';
import '../../styles/Rodape.css';

export function Rodape(): JSX.Element {
  return (
    <footer className="rodape">
      <p>© 2026 Farmácia Saúde +</p>
      <span>Gestão inteligente para sua farmácia</span>
    </footer>
  );
}
