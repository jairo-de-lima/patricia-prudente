export interface Cliente {
  id: string;
  codigo: string;
  cliente: string;
  cnpj: string;
  end: string;
  telFixo?: string;
  email: string;
  suframa?: string;
  transportadora?: string;
  ie: string;
  cep: string;
  cel: string;
  emailFinan: string;
}

export interface Fornecedor {
  id: string;
  codigo: string;
  fornecedor: string;
  cnpj: string;
  endereco: string;
  telFixo?: string;
  emailPedido?: string;
  ie: string;
  cep: string;
  celular: string;
  comissao?: number;
  dataRecebimento?: Date;
  emailFinan: string;
}

export interface Transportadora {
  id: string;
  codigo: string;
  transportadora: string;
  numeroNF?: String;
  descricao?: String;
  cnpj: string;
  endereco: string;
  telFixo?: string;
  unidade?: string;
  dataSaida?: string;
  valortotal?: string;
  nome: string;
}
