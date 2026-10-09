import { BASE_URL, ENDPOINT_CLIENTES } from '../AppConfig';
import type { ClienteDTO } from '../dto/ClienteDTO';

class ClienteRequests {
  private async buscarResposta(url: string, opcoes?: RequestInit, urlAlternativa?: string): Promise<Response> {
    const respostaAPI = await fetch(url, opcoes);

    if (respostaAPI.ok) {
      return respostaAPI;
    }

    if (respostaAPI.status === 404 && urlAlternativa) {
      const respostaAlternativa = await fetch(urlAlternativa, opcoes);
      if (respostaAlternativa.ok) {
        return respostaAlternativa;
      }
      return respostaAlternativa;
    }

    return respostaAPI;
  }

  async listarClientes(): Promise<ClienteDTO[]> {
    const respostaAPI = await this.buscarResposta(`${BASE_URL}${ENDPOINT_CLIENTES}`);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível carregar os clientes.');
    }

    return respostaAPI.json();
  }

  async buscarClientePorId(idCliente: number): Promise<ClienteDTO> {
    const url = `${BASE_URL}${ENDPOINT_CLIENTES}/${idCliente}`;
    const urlAlternativa = `${BASE_URL}${ENDPOINT_CLIENTES.slice(0, -1)}/${idCliente}`;
    const respostaAPI = await this.buscarResposta(url, undefined, urlAlternativa);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível localizar o cliente selecionado.');
    }

    return respostaAPI.json();
  }

  async cadastrarCliente(cliente: ClienteDTO): Promise<ClienteDTO> {
    const respostaAPI = await this.buscarResposta(`${BASE_URL}${ENDPOINT_CLIENTES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    }, `${BASE_URL}${ENDPOINT_CLIENTES.slice(0, -1)}`);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível cadastrar o cliente.');
    }

    return respostaAPI.json();
  }

  async atualizarCliente(cliente: ClienteDTO): Promise<ClienteDTO> {
    const idCliente = cliente.idCliente;

    if (!idCliente) {
      throw new Error('Cliente sem identificador para atualização.');
    }

    const payload = { idCliente, nome: cliente.nome, cpf: cliente.cpf };
    const url = `${BASE_URL}${ENDPOINT_CLIENTES}/${idCliente}`;
    const urlAlternativa = `${BASE_URL}${ENDPOINT_CLIENTES.slice(0, -1)}/${idCliente}`;
    const respostaAPI = await this.buscarResposta(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }, urlAlternativa);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível atualizar o cliente.');
    }

    return respostaAPI.json();
  }

  async removerCliente(idCliente: number): Promise<boolean> {
    const url = `${BASE_URL}${ENDPOINT_CLIENTES}/${idCliente}`;
    const urlAlternativa = `${BASE_URL}${ENDPOINT_CLIENTES.slice(0, -1)}/${idCliente}`;
    const respostaAPI = await this.buscarResposta(url, { method: 'DELETE' }, urlAlternativa);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível remover o cliente.');
    }

    return true;
  }
}

export default new ClienteRequests();
