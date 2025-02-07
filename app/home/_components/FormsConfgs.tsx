"use client";
export const formConfigs = {
  cliente: {
    title: "Cadastro de Cliente",
    codLabel: "Código do Cliente",
    dataCad: {
      id: "dataCad",
      label: "Data de Cadastro",
      type: "text",
      required: true,
    },
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
          mask: "cnpj",
        },
        {
          id: "ie",
          label: "IE",
          type: "text",
          required: true,
          mask: "ie",
        },
        {
          id: "endereco",
          isRow: true,
          fields: [
            {
              id: "endereco",
              label: "END",
              type: "text",
              required: false,
            },
            {
              id: "endNumero",
              label: "Nº",
              type: "text",
              required: false,
            },
            {
              id: "cep",
              label: "CEP",
              type: "text",
              required: false,
              mask: "cep",
            },
          ],
        },
        {
          id: "localizacao",
          isRow: true,
          fields: [
            { id: "cidade", label: "CIDADE", type: "text", required: false },
            { id: "estado", label: "ESTADO", type: "text", required: false },
            { id: "bairro", label: "BAIRRO", type: "text", required: false },
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
              mask: "tel",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: false,
              prefix: "(11)",
              mask: "tel",
            },
          ],
        },
        {
          id: "emails",
          isRow: true,
          fields: [
            { id: "email", label: "E-mail", type: "email", required: false },
            {
              id: "emailFin",
              label: "E-mail Financeiro",
              type: "email",
              required: false,
            },
          ],
        },
        {
          id: "suframa",
          label: "Suframa",
          type: "text",
          require: false,
          mask: "suframa",
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
          mask: "cnpj",
        },
        {
          id: "ie",
          label: "IE",
          type: "text",
          required: true,
          mask: "ie",
        },
        {
          id: "endereco",
          isRow: true,
          fields: [
            {
              id: "endereco",
              label: "END",
              type: "text",
              required: false,
            },
            {
              id: "endNumero",
              label: "Nº",
              type: "text",
              required: false,
            },
            {
              id: "cep",
              label: "CEP",
              type: "text",
              required: false,
              mask: "cep",
            },
          ],
        },
        {
          id: "localizacao",
          isRow: true,
          fields: [
            { id: "cidade", label: "CIDADE", type: "text", required: false },
            { id: "estado", label: "ESTADO", type: "text", required: false },
            { id: "bairro", label: "BAIRRO", type: "text", required: false },
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
              mask: "tel",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: false,
              prefix: "(11)",
              mask: "tel",
            },
          ],
        },
        {
          id: "emailPedido",
          label: "E-mail Pedido",
          type: "email",
          required: false,
        },
        {
          id: "emailFin",
          label: "E-mail Fina:",
          type: "email",
          required: false,
        },
      ],
      extras: [
        {
          id: "comissao",
          label: "Comissao",
          type: "text",
          required: false,
          defaultValue: "",
          mask: "comissao",
        },
        {
          id: "dataRecebimento",
          label: "Data de Recebimento",
          type: "date",
          required: false,
          mask: "Data de Recebimento",
          defaultValue: "",
        },
      ],

      obs: true,
    },
  },
  transportadora: {
    title: "Cadastro de Transportadora",
    dataCad: true,
    codLabel: "Código da Transportadora:",
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
          required: false,
          mask: "cnpj",
        },
        {
          id: "ie",
          label: "IE",
          type: "text",
          required: false,
          mask: "ie",
        },
        {
          id: "endereco",
          isRow: true,
          fields: [
            {
              id: "endereco",
              label: "END",
              type: "text",
              required: false,
            },
            {
              id: "endNumero",
              label: "Nº",
              type: "text",
              required: false,
            },
            {
              id: "cep",
              label: "CEP",
              type: "text",
              required: false,
              mask: "cep",
            },
          ],
        },
        {
          id: "localizacao",
          isRow: true,
          fields: [
            { id: "cidade", label: "CIDADE", type: "text", required: false },
            { id: "estado", label: "ESTADO", type: "text", required: false },
            { id: "bairro", label: "BAIRRO", type: "text", required: false },
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
              mask: "tel",
              defaultValue: "",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: false,
              prefix: "(11)",
              mask: "tel",
              defaultValue: "",
            },
          ],
        },
        { id: "email", label: "E-mail", type: "email", required: false },
        {
          id: "emailFina",
          label: "E-mail Financeiro",
          type: "email",
          required: false,
        },
      ],
      obs: true,
    },
  },
};
