import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ClienteDTO } from '../../dto/ClienteDTO';
import ClienteRequests from '../../fetch/ClienteRequests';
import { ConfirmacaoCard } from '../ConfirmacaoCard/ConfirmacaoCard';
import '../../styles/ListagensPadrao.css';

type ListagemClientesProps = {
  clientes?: ClienteDTO[];
};

export function ListagemClientes({ clientes }: ListagemClientesProps): JSX.Element {
  const navigate = useNavigate();
  const [lista, setLista] = useState<ClienteDTO[]>(clientes ?? []);
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(!clientes);
  const [clienteParaRemover, setClienteParaRemover] = useState<ClienteDTO | null>(null);

  useEffect(() => {
    if (!clientes) {
      carregarClientes();
    } else {
      setLista(clientes);
      setCarregando(false);
    }
  }, [clientes]);

  const carregarClientes = async () => {
    try {
      setCarregando(true);
      setErro('');
      const resposta = await ClienteRequests.listarClientes();
      setLista(resposta);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao carregar clientes.');
    } finally {
      setCarregando(false);
    }
  };

  const confirmarRemocao = async () => {
    if (!clienteParaRemover?.idCliente) {
      return;
    }

    try {
      await ClienteRequests.removerCliente(clienteParaRemover.idCliente);
      setLista((atual) => atual.filter((cliente) => cliente.idCliente !== clienteParaRemover.idCliente));
      setClienteParaRemover(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao remover cliente.');
    }
  };

  return (
    <div className="listagem-wrapper">
      <div className="listagem-header">
        <div>
          <p className="eyebrow">Clientes</p>
          <h2>Cadastro de clientes</h2>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/clientes/cadastro')}>
          Novo cliente
        </button>
      </div>

      {erro ? (
        <div className="error-panel">
          <p>{erro}</p>
          <button type="button" className="btn btn-secondary btn-retry" onClick={carregarClientes}>
            Tentar novamente
          </button>
        </div>
      ) : null}

      {carregando ? (
        <div className="empty-state">
          <p>Carregando clientes...</p>
        </div>
      ) : null}

      {!carregando && !erro && lista.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum cliente cadastrado.</p>
        </div>
      ) : null}

      {!carregando && !erro && lista.length > 0 ? (
        <div className="table-responsive">
          <table className="farmacia-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((cliente) => (
                <tr key={cliente.idCliente ?? `${cliente.nome}-${cliente.cpf}`}>
                  <td>{cliente.idCliente ?? '-'}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.email}</td>
                  <td className="table-actions">
                    <button type="button" className="btn btn-link" onClick={() => navigate(`/clientes/detalhes/${cliente.idCliente}`)}>
                      Detalhes
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(`/clientes/atualizar/${cliente.idCliente}`)}>
                      Atualizar
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => setClienteParaRemover(cliente)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {clienteParaRemover ? (
        <div className="modal-overlay">
          <ConfirmacaoCard
            titulo="Remover cliente"
            descricao={`Deseja realmente remover ${clienteParaRemover.nome}?`}
            onConfirmar={confirmarRemocao}
            onCancelar={() => setClienteParaRemover(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
