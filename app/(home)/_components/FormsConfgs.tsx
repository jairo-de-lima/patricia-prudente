export const formConfigs = {
  cliente: {
    title: "Cadastro de Cliente",
    codLabel: false,
    dataCad: true,
    fields: {
      leftColumn: [
        {
          id: "razaoSocial",
          label: "Razão Social",
          type: "text",
          required: true,
        },
        {
          id: "cnpj",
          label: "CNPJ",
          type: "text",
          required: true,
          prefix: "__.___.___/____-__",
          maskType: "cnpj",
        },
        { id: "ie", label: "IE", type: "text", required: true },
        {
          id: "endereco",
          isRow: true,
          fields: [
            { id: "endereco", label: "END", type: "text", required: true },
            { id: "endNumero", label: "Nº", type: "text", required: true },
            {
              id: "cep",
              label: "Cep",
              type: "text",
              required: true,
              prefix: "_____-___",
              maskType: "cep",
            },
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
              prefix: "(__)____-____",
              maskType: "tel",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: true,
              prefix: "(__)_.____-____",
              maskType: "tel",
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
        {
          id: "tel",
          label: "Telefone",
          type: "tel",
          prefix: "(__)____-____",
          maskType: "tel",
        },
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
        {
          id: "cnpj",
          label: "CNPJ",
          type: "text",
          required: true,
          prefix: "__.___.___/____-__",
          maskType: "cnpj",
        },
        { id: "ie", label: "IE", type: "text", required: true },
        {
          id: "endereco",
          isRow: true,
          fields: [
            { id: "endereco", label: "END", type: "text", required: true },
            { id: "endNumero", label: "Nº", type: "text", required: true },
            {
              id: "cep",
              label: "Cep",
              type: "text",
              required: true,
              prefix: "_____-___",
              maskType: "cep",
            },
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
              prefix: "(__)____-____",
              maskType: "tel",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: true,
              prefix: "(__)_.____-____",
              maskType: "tel",
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
    codLabel: "Código da Transportadora",
    fields: {
      leftColumn: [
        {
          id: "razaoSocial",
          label: "Razão Social",
          type: "text",
          required: true,
        },
        {
          id: "cnpj",
          label: "CNPJ",
          type: "text",
          required: true,
          prefix: "__.___.___/____-__",
          maskType: "cnpj",
        },
        { id: "ie", label: "IE", type: "text", required: true },
        {
          id: "endereco",
          isRow: true,
          fields: [
            { id: "endereco", label: "END", type: "text", required: false },
            { id: "endNumero", label: "Nº", type: "text", required: false },
            {
              id: "cep",
              label: "Cep",
              type: "text",
              required: false,
              prefix: "_____-___",
              maskType: "cep",
            },
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
              prefix: "(__)____-____",
              maskType: "cel",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: false,
              prefix: "(__)_.____-____",
              maskType: "cel",
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
