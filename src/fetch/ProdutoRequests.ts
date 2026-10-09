import { BASE_URL, ENDPOINT_PRODUTOS } from '../AppConfig';
import type { ProdutoDTO } from '../dto/ProdutoDTO';

class ProdutoRequests {
  private serializarProduto(produto: ProdutoDTO): ProdutoDTO {
    return {
      ...produto,
      validade: produto.validade ? new Date(produto.validade).toISOString().slice(0, 10) : undefined,
    };
  }

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

  async listarProdutos(): Promise<ProdutoDTO[]> {
    const respostaAPI = await this.buscarResposta(`${BASE_URL}${ENDPOINT_PRODUTOS}`);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível carregar os produtos.');
    }

    return respostaAPI.json();
  }

  async buscarProdutoPorId(idProduto: number): Promise<ProdutoDTO> {
    const url = `${BASE_URL}${ENDPOINT_PRODUTOS}/${idProduto}`;
    const urlAlternativa = `${BASE_URL}${ENDPOINT_PRODUTOS.slice(0, -1)}/${idProduto}`;
    const respostaAPI = await this.buscarResposta(url, undefined, urlAlternativa);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível localizar o produto selecionado.');
    }

    return respostaAPI.json();
  }

  async obterProdutoPorId(idProduto: number): Promise<ProdutoDTO> {
    return this.buscarProdutoPorId(idProduto);
  }

  async cadastrarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
    const respostaAPI = await this.buscarResposta(`${BASE_URL}${ENDPOINT_PRODUTOS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.serializarProduto(produto)),
    }, `${BASE_URL}${ENDPOINT_PRODUTOS.slice(0, -1)}`);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível cadastrar o produto.');
    }

    return respostaAPI.json();
  }

  async atualizarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
    const idProduto = produto.idProduto;

    if (!idProduto) {
      throw new Error('Produto sem identificador para atualização.');
    }

    const payload = this.serializarProduto(produto);
    const url = `${BASE_URL}${ENDPOINT_PRODUTOS}/${idProduto}`;
    const urlAlternativa = `${BASE_URL}${ENDPOINT_PRODUTOS.slice(0, -1)}/${idProduto}`;
    const respostaAPI = await this.buscarResposta(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }, urlAlternativa);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível atualizar o produto.');
    }

    return respostaAPI.json();
  }

  async removerProduto(idProduto: number): Promise<boolean> {
    const url = `${BASE_URL}${ENDPOINT_PRODUTOS}/${idProduto}`;
    const urlAlternativa = `${BASE_URL}${ENDPOINT_PRODUTOS.slice(0, -1)}/${idProduto}`;
    const respostaAPI = await this.buscarResposta(url, { method: 'DELETE' }, urlAlternativa);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível remover o produto.');
    }

    return true;
  }
}

export default new ProdutoRequests();
