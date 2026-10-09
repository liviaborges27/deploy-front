import type { JSX } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FormCliente } from '../components/Formularios/FormCliente';
import type { ClienteDTO } from '../dto/ClienteDTO';

export function PAtualizarCliente(): JSX.Element {
  const { id, idCliente } = useParams<{ id?: string; idCliente?: string }>();
  const location = useLocation();
  const clienteState = (location.state as { cliente?: ClienteDTO; idCliente?: number } | null) ?? null;
  const clienteId = Number(id ?? idCliente ?? clienteState?.idCliente ?? clienteState?.cliente?.idCliente);

  return <FormCliente idCliente={Number.isFinite(clienteId) && clienteId > 0 ? clienteId : undefined} clienteInicial={clienteState?.cliente} />;
}
