export const formConfigs = {
  cliente: {
    title: "Cadastro de Clientes",
    codLabel: "Cod. Cliente",
    fields: {
      leftColumn: [
        { id: "cliente", label: "Cliente", type: "text", required: true },
        { id: "cnpj", label: "CNPJ", type: "text", required: true },
        { id: "end", label: "End", type: "text", required: true },
        { id: "telFixo", label: "Tel Fixo", type: "text", required: false },
        { id: "email", label: "Email", type: "email", required: false },
        { id: "suframa", label: "Suframa", type: "text", required: false },
        {
          id: "transportadora",
          label: "Transportadora",
          type: "text",
          required: false,
        },
      ],
      rightColumn: [
        { id: "ie", label: "I.E.", type: "text", required: true },
        { id: "cep", label: "CEP", type: "text", required: true },
        { id: "cel", label: "Cel", type: "text", required: true },
        {
          id: "emailFinan",
          label: "Email Final",
          type: "email",
          required: true,
        },
      ],
    },
  },
  fornecedor: {
    title: "Cadastro de Fornecedores",
    codLabel: "Cod. Fornecedor",
    fields: {
      leftColumn: [
        { id: "fornecedor", label: "Fornecedor", type: "text", required: true },
        { id: "cnpj", label: "CNPJ", type: "text", required: true },
        { id: "endereco", label: "Endereço", type: "text", required: true },
        { id: "telFixo", label: "Tel Fixo", type: "text", required: false },
        {
          id: "emailPedido",
          label: "Email Pedido",
          type: "email",
          required: false,
        },
        { id: "ie", label: "I.E.", type: "text", required: false },
      ],
      rightColumn: [
        { id: "cep", label: "CEP", type: "text", required: true },
        { id: "celular", label: "Celular", type: "text", required: true },
        {
          id: "emailFin",
          label: "Email Final",
          type: "email",
          required: true,
        },
        {
          id: "comissao",
          label: "Comissão",
          type: "number",
          step: "0.01",
          required: false,
        },
        {
          id: "dataRecebimento",
          label: "Data de Recebimento",
          type: "date",
          required: false,
        },
      ],
    },
  },
  transportadora: {
    title: "Cadastro de Transportadoras",
    codLabel: "Cod. Transportadora",
    fields: {
      leftColumn: [
        {
          id: "transportadora",
          label: "Transportadora",
          type: "text",
          required: true,
        },
        { id: "NumeroNF", label: "Numero da NF", type: "text", required: true },
        { id: "descricao", label: "Descrição", type: "text", required: false },
        {
          id: "quantidade",
          label: "Quantidade",
          type: "number",
          required: false,
        },
      ],
      rightColumn: [
        { id: "ValorUn", label: "Unidades", type: "number", required: false },
        {
          id: "ValorTotal",
          label: "Valor Total",
          type: "number",
          required: false,
        },
        {
          id: "DataSaida",
          label: "Data de Saida",
          type: "date",
          required: false,
        },
      ],
    },
  },
};
