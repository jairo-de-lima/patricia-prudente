export const formConfigs = {
  cliente: {
    title: "Cadastro de Cliente",
    codLabel: "Código do Cliente",
    dataCad: true,
    fields: {
      leftColumn: [
        {
          id: "razaoSocial",
          label: "Razão Social",
          type: "text",
          required: true,
        },
        { id: "cnpj", label: "CNPJ", type: "text", required: true },
        { id: "ie", label: "IE", type: "text", required: true },
        {
          id: "endereco",
          isRow: true,
          fields: [
            { id: "endereco", label: "END", type: "text", required: true },
            { id: "endNumero", label: "Nº", type: "text", required: true },
            { id: "cep", label: "Cep", type: "text", required: true },
          ],
        },
        {
          id: "localizacao",
          isRow: true,
          fields: [
            { id: "cidade", label: "CIDADE", type: "text", required: true },
            { id: "estado", label: "ESTADO", type: "text", required: true },
          ],
        },
        {
          id: "telefones",
          isRow: true,
          fields: [
            {
              id: "telefoneFixo",
              label: "Tel Fixo",
              type: "tel",
              required: true,
              prefix: "(11)",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: true,
              prefix: "(11)",
            },
          ],
        },
        {
          id: "emails",
          isRow: true,
          fields: [
            { id: "email", label: "Email", type: "email", required: true },
            {
              id: "emailFin",
              label: "Email Financeiro",
              type: "email",
              required: true,
            },
          ],
        },

        { id: "suframa", label: "Suframa", type: "text", require: false },
        { id: "transp", label: "Transportadora", type: "text" },
        { id: "tel", label: "Telefone", type: "tel", prefix: "(11)" },
      ],
    },
  },

  fornecedor: {
    title: "Cadastro de Fornecedor",
    dataCad: true,
    codLabel: "Código do fornecedor",
    fields: {
      leftColumn: [
        {
          id: "razaoSocial",
          label: "Razão Social",
          type: "text",
          required: true,
        },
        { id: "cnpj", label: "CNPJ", type: "text", required: true },
        { id: "ie", label: "IE", type: "text", required: true },
        {
          id: "endereco",
          isRow: true,
          fields: [
            { id: "endereco", label: "END", type: "text", required: true },
            { id: "endNumero", label: "Nº", type: "text", required: true },
            { id: "cep", label: "Cep", type: "text", required: true },
          ],
        },
        {
          id: "telefones",
          isRow: true,
          fields: [
            {
              id: "telefoneFixo",
              label: "Tel Fixo",
              type: "tel",
              required: false,
              prefix: "( )",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: true,
              prefix: "(11)",
            },
          ],
        },
        {
          id: "emailPedido",
          label: "Email Pedido",
          type: "email",
          required: false,
        },
        { id: "emailFin", label: "Email Fina", type: "email", required: true },
      ],
      extras: [
        {
          id: "comissao",
          label: "Comissao",
          type: "number",
          required: false,
        },
        {
          id: "dataRecebimento",
          label: "Data de recebimento",
          type: "date",
          required: false,
        },
      ],

      obs: true,
    },
  },

  transportadora: {
    title: "Cadastro de Transportadora",
    dataCad: true,
    codLabel: "Código da Transp",
    fields: {
      leftColumn: [
        {
          id: "razaoSocial",
          label: "Razão Social",
          type: "text",
          required: true,
        },
        { id: "cnpj", label: "CNPJ", type: "text", required: true },
        { id: "ie", label: "IE", type: "text", required: true },
        {
          id: "endereco",
          isRow: true,
          fields: [
            { id: "endereco", label: "END", type: "text", required: false },
            { id: "endNumero", label: "Nº", type: "text", required: false },
            { id: "cep", label: "Cep", type: "text", required: false },
          ],
        },
        {
          id: "localizacao",
          isRow: true,
          fields: [
            { id: "cidade", label: "CIDADE", type: "text", required: false },
            { id: "estado", label: "ESTADO", type: "text", required: false },
          ],
        },
        {
          id: "telefones",
          isRow: true,
          fields: [
            {
              id: "telefoneFixo",
              label: "Tel Fixo",
              type: "tel",
              required: false,
              prefix: "(11)",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: false,
              prefix: "(11)",
            },
          ],
        },
        { id: "email", label: "Email", type: "email", required: false },
        {
          id: "emailFina",
          label: "Email Financeiro",
          type: "email",
          required: false,
        },
      ],
      obs: true,
    },
  },
};
