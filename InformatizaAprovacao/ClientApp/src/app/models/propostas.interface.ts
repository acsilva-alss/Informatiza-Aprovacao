export interface IPropostas{
  id: number;
  id_categoria: number;
  id_fornecedor: number;
  nome: string;
  data: Date;
  valor: number;
  descricao: string;
  caminho_arquivo: string;
  aprovada_analista_compras: boolean;
  aprovada_analista_financeiro: boolean;
  aprovada_diretor_financeiro: boolean;
}
