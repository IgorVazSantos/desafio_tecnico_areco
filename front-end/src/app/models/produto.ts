export interface Produto {
  id?: string;
  nome: string;
  tipo: string;
  descricao: string;
  precoUnitario: number;
  quantidadeEmEstoque: number;
  createdAt?: string;
  updatedAt?: string;
}