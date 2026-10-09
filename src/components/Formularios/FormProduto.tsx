import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProdutoDTO } from '../../dto/ProdutoDTO';
import ProdutoRequests from '../../fetch/ProdutoRequests';
import { AlertCard } from '../AlertCard/AlertCard';
import styles from '../../styles/DetalhesPadrao.module.css';

type FormProdutoProps = {
  idProduto?: number;
};

const produtoInicial: ProdutoDTO = {
  nomeProduto: '',
  categoria: '',
  preco: 0,
  quantidadeEstoque: 0,
  descricao: '',
  fabricante: '',
};

export function FormProduto({ idProduto }: FormProdutoProps): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProdutoDTO>(produtoInicial);
  const [alerta, setAlerta] = useState<string>('');
  const [tipoAlerta, setTipoAlerta] = useState<'sucesso' | 'erro' | 'info'>('info');
  const [carregando, setCarregando] = useState<boolean>(Boolean(idProduto));

  useEffect(() => {
    const carregarProduto = async () => {
      if (!idProduto) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        const produto = await ProdutoRequests.buscarProdutoPorId(idProduto);
        setFormData(produto);
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : 'Erro ao carregar produto.';
        setAlerta(mensagem);
        setTipoAlerta('erro');
      } finally {
        setCarregando(false);
      }
    };

    carregarProduto();
  }, [idProduto]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((atual) => ({
      ...atual,
      [name]: name === 'preco' || name === 'quantidadeEstoque' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setCarregando(true);
      if (idProduto) {
        await ProdutoRequests.atualizarProduto(idProduto, formData);
        setAlerta('Produto atualizado com sucesso.');
      } else {
        await ProdutoRequests.cadastrarProduto(formData);
        setAlerta('Produto cadastrado com sucesso.');
      }
      setTipoAlerta('sucesso');
      setTimeout(() => navigate('/produtos'), 600);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao salvar produto.';
      setAlerta(mensagem);
      setTipoAlerta('erro');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.container}> 
      <div className={styles.card}> 
        <div className={styles.header}> 
          <div>
            <p className={styles.eyebrow}>{idProduto ? 'Atualização' : 'Cadastro'}</p>
            <h2>{idProduto ? 'Atualizar produto' : 'Cadastrar produto'}</h2>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/produtos')}>
            Voltar
          </button>
        </div>

        {alerta ? <AlertCard tipo={tipoAlerta} mensagem={alerta} onClose={() => setAlerta('')} /> : null}

        {carregando ? (
          <div className={styles.emptyState}>Carregando produto...</div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <label>
                <span>Nome do produto</span>
                <input name="nomeProduto" value={formData.nomeProduto} onChange={handleChange} required />
              </label>
              <label>
                <span>Categoria</span>
                <input name="categoria" value={formData.categoria} onChange={handleChange} required />
              </label>
              <label>
                <span>Preço</span>
                <input type="number" step="0.01" min="0" name="preco" value={formData.preco} onChange={handleChange} required />
              </label>
              <label>
                <span>Quantidade em estoque</span>
                <input type="number" min="0" name="quantidadeEstoque" value={formData.quantidadeEstoque} onChange={handleChange} required />
              </label>
              <label className={styles.fullWidth}>
                <span>Descrição</span>
                <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3} required />
              </label>
              <label>
                <span>Fabricante</span>
                <input name="fabricante" value={formData.fabricante} onChange={handleChange} required />
              </label>
            </div>

            <div className={styles.actions}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/produtos')}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={carregando}>
                {carregando ? 'Salvando...' : idProduto ? 'Atualizar produto' : 'Cadastrar produto'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
