import { useEffect, useState, type JSX } from 'react';
import { ListagemProdutos } from '../components/Listagens/ListagemProdutos';
import ProdutoRequests from '../fetch/ProdutoRequests';
import type { ProdutoDTO } from '../dto/ProdutoDTO';

export function PListagemProduto(): JSX.Element {
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await ProdutoRequests.listarProdutos();
        setProdutos(dados);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  if (carregando) {
    return <div className="empty-state"><p>Carregando produtos...</p></div>;
  }

  return <ListagemProdutos produtos={produtos} />;
}
