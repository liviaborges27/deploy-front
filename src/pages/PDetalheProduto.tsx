import { useEffect, useState, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCard } from '../components/AlertCard/AlertCard';
import ProdutoRequests from '../fetch/ProdutoRequests';
import type { ProdutoDTO } from '../dto/ProdutoDTO';
import styles from '../styles/DetalhesPadrao.module.css';

export function PDetalheProduto(): JSX.Element {
  const { idProduto } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<ProdutoDTO | null>(null);
  const [erro, setErro] = useState<string>('');

  useEffect(() => {
    const carregar = async () => {
      if (!idProduto) {
        setErro('Produto não identificado.');
        return;
      }

      try {
        const resultado = await ProdutoRequests.buscarProdutoPorId(Number(idProduto));
        setProduto(resultado);
      } catch (error) {
        setErro(error instanceof Error ? error.message : 'Erro ao buscar produto.');
      }
    };

    carregar();
  }, [idProduto]);

  if (erro) {
    return (
      <div className={styles.container}>
        <AlertCard tipo="erro" mensagem={erro} />
      </div>
    );
  }

  if (!produto) {
    return <div className="empty-state"><p>Carregando produto...</p></div>;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.detailCard}`}>
        <div className={styles.detailHeader}>
          <div>
            <p className={styles.eyebrow}>Detalhes</p>
            <h2>{produto.nomeProduto}</h2>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/produtos')}>
            Voltar
          </button>
        </div>

        <div className={styles.detailGrid}>
          <div className={styles.detailItem}><span>Categoria</span><strong>{produto.categoria}</strong></div>
          <div className={styles.detailItem}><span>Fabricante</span><strong>{produto.fabricante}</strong></div>
          <div className={styles.detailItem}><span>Preço</span><strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}</strong></div>
          <div className={styles.detailItem}><span>Estoque</span><strong>{produto.quantidadeEstoque}</strong></div>
          <div className={`${styles.detailItem} ${styles.fullWidth}`}><span>Descrição</span><strong>{produto.descricao}</strong></div>
        </div>
      </div>
    </div>
  );
}
