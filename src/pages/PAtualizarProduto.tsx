import type { JSX } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FormProduto } from '../components/Formularios/FormProduto';
import type { ProdutoDTO } from '../dto/ProdutoDTO';

export function PAtualizarProduto(): JSX.Element {
  const { id, idProduto } = useParams<{ id?: string; idProduto?: string }>();
  const location = useLocation();
  const produtoState = (location.state as { produto?: ProdutoDTO; idProduto?: number } | null) ?? null;
  const produtoId = Number(id ?? idProduto ?? produtoState?.idProduto ?? produtoState?.produto?.idProduto);

  return <FormProduto idProduto={Number.isFinite(produtoId) && produtoId > 0 ? produtoId : undefined} produtoInicial={produtoState?.produto} />;
}
