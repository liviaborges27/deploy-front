import { useEffect, useState, type JSX } from 'react';
import { ListagemClientes } from '../components/Listagens/ListagemClientes';
import ClienteRequests from '../fetch/ClienteRequests';
import type { ClienteDTO } from '../dto/ClienteDTO';

export function PListagemCliente(): JSX.Element {
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await ClienteRequests.listarClientes();
        setClientes(dados);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  if (carregando) {
    return <div className="empty-state"><p>Carregando clientes...</p></div>;
  }

  return <ListagemClientes clientes={clientes} />;
}
