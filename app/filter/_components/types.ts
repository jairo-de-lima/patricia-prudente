export interface BaseEntity {
  id: string;
  dataCad: Date;
  codigo: string;
  razaoSocial: string;
  cnpj: string;
  ie: string;
  endereco: string;
  endNumero: string;
  cep: string;
  telefoneFixo?: string;
  celular?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cliente extends BaseEntity {
  email?: string;
  emailFin: string;
  suframa?: string;
  transp?: string;
  tel?: string;
  cidade: string;
  estado: string;
  NumeroNF?: string;
}

export interface Fornecedor extends BaseEntity {
  emailPedido: string;
  emailFin: string;
  comissao?: string;
  dataRecebimento?: Date;
  obs?: string;
  NumeroNF?: string;
}

export interface Transportadora extends BaseEntity {
  cidade: string;
  estado: string;
  email?: string;
  emailFina?: string;
  obs?: string;
  NumeroNF?: string;
}
