export interface ProdutoDTO {
  idProduto?: number;
  descricao: string;
  validade?: string | Date;
  preco: number;
  qtdEstoque: number;
  qtdMinEstoque?: number;
}
