export type Cliente = {
  id: string;
  dataCad: Date;
  codigo: string;
  razaoSocial: string;
  cnpj: string; // Deve ser único
  ie: string; // Inscrição Estadual, único
  endereco: string;
  endNumero: string;
  cep: string;
  cidade: string;
  estado: string;
  telefoneFixo?: string;
  celular?: string;
  email?: string;
  emailFin: string;
  suframa?: string;
  transp?: string;
  tel?: string;
  NumeroNF?: string;
  createdAt: Date;
  updatedAt: Date;
  transportadoras?: Transportadora[];
};

export type Fornecedor = {
  id: string;
  dataCad: Date;
  codigo: string;
  razaoSocial: string;
  cnpj: string; // Deve ser único
  ie: string; // Inscrição Estadual, único
  endereco: string;
  endNumero: string;
  cep: string;
  telefoneFixo?: string;
  celular?: string;
  emailPedido: string;
  emailFin: string;
  comissao?: string;
  dataRecebimento?: Date;
  obs?: string;
  NumeroNF?: string;
  createdAt: Date;
  updatedAt: Date;
  transportadoras?: Transportadora[];
};

export type Transportadora = {
  id: string;
  dataCad: Date;
  codigo: string;
  razaoSocial: string;
  cnpj: string; // Deve ser único
  ie: string; // Inscrição Estadual, único
  endereco: string;
  endNumero: string;
  cep: string;
  cidade: string;
  estado: string;
  telefoneFixo?: string;
  celular?: string;
  email?: string;
  emailFina?: string;
  obs?: string;
  NumeroNF?: string;
  createdAt: Date;
  updatedAt: Date;
  clienteId?: string;
  fornecedorId?: string;
  Cliente?: Cliente;
  Fornecedor?: Fornecedor;
};