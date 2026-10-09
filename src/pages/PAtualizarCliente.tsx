import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { FormCliente } from '../components/Formularios/FormCliente';

export function PAtualizarCliente(): JSX.Element {
  const { idCliente } = useParams();

  return <FormCliente idCliente={Number(idCliente)} />;
}
