import { BASE_URL, ENDPOINT_PRODUTOS } from '../AppConfig';
import type { ProdutoDTO } from '../dto/ProdutoDTO';

class ProdutoRequests {
  private serializarProduto(produto: ProdutoDTO): ProdutoDTO {
    return {
      ...produto,
      validade: produto.validade ? new Date(produto.validade).toISOString().slice(0, 10) : undefined,
    };
  }

  async listarProdutos(): Promise<ProdutoDTO[]> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_PRODUTOS}`);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível carregar os produtos.');
    }

    return respostaAPI.json();
  }

  async buscarProdutoPorId(idProduto: number): Promise<ProdutoDTO> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_PRODUTOS}/${idProduto}`);

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível localizar o produto selecionado.');
    }

    return respostaAPI.json();
  }

  async cadastrarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_PRODUTOS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.serializarProduto(produto)),
    });

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível cadastrar o produto.');
    }

    return respostaAPI.json();
  }

  async atualizarProduto(idProduto: number, produto: ProdutoDTO): Promise<ProdutoDTO> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_PRODUTOS}/${idProduto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.serializarProduto(produto)),
    });

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível atualizar o produto.');
    }

    return respostaAPI.json();
  }

  async removerProduto(idProduto: number): Promise<boolean> {
    const respostaAPI = await fetch(`${BASE_URL}${ENDPOINT_PRODUTOS}/${idProduto}`, {
      method: 'DELETE',
    });

    if (!respostaAPI.ok) {
      throw new Error('Não foi possível remover o produto.');
    }

    return true;
  }
}

export default new ProdutoRequests();
