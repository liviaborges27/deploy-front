import { useEffect, useState, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCard } from '../components/AlertCard/AlertCard';
import ClienteRequests from '../fetch/ClienteRequests';
import type { ClienteDTO } from '../dto/ClienteDTO';
import styles from '../styles/DetalhesPadrao.module.css';

export function PDetalheCliente(): JSX.Element {
  const { idCliente } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<ClienteDTO | null>(null);
  const [erro, setErro] = useState<string>('');

  useEffect(() => {
    const carregar = async () => {
      if (!idCliente) {
        setErro('Cliente não identificado.');
        return;
      }

      try {
        const resultado = await ClienteRequests.buscarClientePorId(Number(idCliente));
        setCliente(resultado);
      } catch (error) {
        setErro(error instanceof Error ? error.message : 'Erro ao buscar cliente.');
      }
    };

    carregar();
  }, [idCliente]);

  if (erro) {
    return (
      <div className={styles.container}>
        <AlertCard tipo="erro" mensagem={erro} />
      </div>
    );
  }

  if (!cliente) {
    return <div className="empty-state"><p>Carregando cliente...</p></div>;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.detailCard}`}>
        <div className={styles.detailHeader}>
          <div>
            <p className={styles.eyebrow}>Detalhes</p>
            <h2>{cliente.nome}</h2>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/clientes')}>
            Voltar
          </button>
        </div>

        <div className={styles.detailGrid}>
          <div className={styles.detailItem}><span>Nome</span><strong>{cliente.nome}</strong></div>
          <div className={styles.detailItem}><span>CPF</span><strong>{cliente.cpf}</strong></div>
        </div>
      </div>
    </div>
  );
}
