import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProdutoDTO } from '../../dto/ProdutoDTO';
import ProdutoRequests from '../../fetch/ProdutoRequests';
import { ConfirmacaoCard } from '../ConfirmacaoCard/ConfirmacaoCard';
import '../../styles/ListagensPadrao.css';

type ListagemProdutosProps = {
  produtos?: ProdutoDTO[];
};

export function ListagemProdutos({ produtos }: ListagemProdutosProps): JSX.Element {
  const navigate = useNavigate();
  const [lista, setLista] = useState<ProdutoDTO[]>(produtos ?? []);
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(!produtos);
  const [produtoParaRemover, setProdutoParaRemover] = useState<ProdutoDTO | null>(null);

  useEffect(() => {
    if (!produtos) {
      carregarProdutos();
    } else {
      setLista(produtos);
      setCarregando(false);
    }
  }, [produtos]);

  const carregarProdutos = async () => {
    try {
      setCarregando(true);
      setErro('');
      const resposta = await ProdutoRequests.listarProdutos();
      setLista(resposta);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao carregar produtos.');
    } finally {
      setCarregando(false);
    }
  };

  const confirmarRemocao = async () => {
    if (!produtoParaRemover?.idProduto) {
      return;
    }

    try {
      await ProdutoRequests.removerProduto(produtoParaRemover.idProduto);
      setLista((atual) => atual.filter((produto) => produto.idProduto !== produtoParaRemover.idProduto));
      setProdutoParaRemover(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao remover produto.');
    }
  };

  return (
    <div className="listagem-wrapper">
      <div className="listagem-header">
        <div>
          <p className="eyebrow">Produtos</p>
          <h2>Controle de estoque</h2>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/produtos/cadastro')}>
          Novo produto
        </button>
      </div>

      {erro ? (
        <div className="error-panel">
          <p>{erro}</p>
          <button type="button" className="btn btn-secondary btn-retry" onClick={carregarProdutos}>
            Tentar novamente
          </button>
        </div>
      ) : null}

      {carregando ? (
        <div className="empty-state">
          <p>Carregando produtos...</p>
        </div>
      ) : null}

      {!carregando && !erro && lista.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum produto cadastrado.</p>
        </div>
      ) : null}

      {!carregando && !erro && lista.length > 0 ? (
        <div className="table-responsive">
          <table className="farmacia-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((produto) => (
                <tr key={produto.idProduto ?? `${produto.nomeProduto}-${produto.fabricante}`}>
                  <td>{produto.idProduto ?? '-'}</td>
                  <td>{produto.nomeProduto}</td>
                  <td>{produto.categoria}</td>
                  <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}</td>
                  <td>{produto.quantidadeEstoque}</td>
                  <td className="table-actions">
                    <button type="button" className="btn btn-link" onClick={() => navigate(`/produtos/detalhes/${produto.idProduto}`)}>
                      Detalhes
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(`/produtos/atualizar/${produto.idProduto}`)}>
                      Atualizar
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => setProdutoParaRemover(produto)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {produtoParaRemover ? (
        <div className="modal-overlay">
          <ConfirmacaoCard
            titulo="Remover produto"
            descricao={`Deseja realmente remover ${produtoParaRemover.nomeProduto}?`}
            onConfirmar={confirmarRemocao}
            onCancelar={() => setProdutoParaRemover(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
