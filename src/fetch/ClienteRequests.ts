import { BASE_URL, ENDPOINT_CLIENTES } from '../AppConfig';
import type { ClienteDTO } from '../dto/ClienteDTO';

class ClienteRequests {
  async listarClientes(): Promise<ClienteDTO[]> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_CLIENTES}`);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível carregar os clientes.');
    }

    return respostaAPI.json();
  }

  async buscarClientePorId(idCliente: number): Promise<ClienteDTO> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_CLIENTES}/${idCliente}`);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível localizar o cliente selecionado.');
    }

    return respostaAPI.json();
  }

  async cadastrarCliente(cliente: ClienteDTO): Promise<ClienteDTO> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_CLIENTES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível cadastrar o cliente.');
    }

    return respostaAPI.json();
  }

  async atualizarCliente(idCliente: number, cliente: ClienteDTO): Promise<ClienteDTO> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_CLIENTES}/${idCliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível atualizar o cliente.');
    }

    return respostaAPI.json();
  }

  async removerCliente(idCliente: number): Promise<boolean> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_CLIENTES}/${idCliente}`, {
      method: 'DELETE',
    });

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível remover o cliente.');
    }

    return true;
  }
}

export default new ClienteRequests();
