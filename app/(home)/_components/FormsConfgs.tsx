export const formConfigs = {
  cliente: {
    title: "Cadastro de Cliente",
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
            { id: "end", label: "END", type: "text", required: true },
            { id: "numero", label: "Nº", type: "text", required: true },
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
              id: "telFixo",
              label: "Tel Fixo",
              type: "tel",
              required: true,
              prefix: "(11)",
            },
            {
              id: "telCel",
              label: "Tel Cel",
              type: "tel",
              required: true,
              prefix: "(11)",
            },
          ],
        },
        {
          id: " E-mails",
          isRow: true,
          fields: [
            { id: "email", label: "Email", type: "email", required: true },
            {
              id: "emailFina",
              label: "Email Financeiro",
              type: "email",
              required: true,
            },
          ],
        },

        { id: "suframa", label: "Suframa", type: "text", require: false },
        { id: "Transportadora", label: "Transportadora", type: "text" },
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
            { id: "end", label: "END", type: "text", required: true },
            { id: "numero", label: "Nº", type: "text", required: true },
            { id: "cep", label: "Cep", type: "text", required: true },
          ],
        },
        {
          id: "telefones",
          isRow: true,
          fields: [
            {
              id: "telFixo",
              label: "Tel Fixo",
              type: "tel",
              required: true,
              prefix: "(11)",
            },
            {
              id: "telCel",
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
          required: true,
        },
        { id: "emailFina", label: "Email Fina", type: "email", required: true },
      ],
      extras: {
        comissao: "2%",
        dataRecebimento: "20",
      },
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
            { id: "end", label: "END", type: "text", required: true },
            { id: "numero", label: "Nº", type: "text", required: true },
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
              id: "telFixo",
              label: "Tel Fixo",
              type: "tel",
              required: true,
              prefix: "(11)",
            },
            {
              id: "telCel",
              label: "Tel Cel",
              type: "tel",
              required: true,
              prefix: "(11)",
            },
          ],
        },
        { id: "email", label: "Email", type: "email", required: true },
        {
          id: "emailFina",
          label: "Email Financeiro",
          type: "email",
          required: true,
        },
      ],
      obs: true,
    },
  },
};
