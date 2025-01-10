export interface Fornecedor {
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
  }
  