import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { FormProduto } from '../components/Formularios/FormProduto';

export function PAtualizarProduto(): JSX.Element {
  const { idProduto } = useParams();

  return <FormProduto idProduto={Number(idProduto)} />;
}
