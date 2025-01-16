"use client";
export const formConfigs = {
  cliente: {
    title: "Cadastro de Cliente",
    codLabel: false,
    dataCad: {
      id: "dataCad",
      label: "Data de Cadastro",
      type: "text",
      required: true,
      mask: "99/99/9999", // Máscara para data no formato dd/mm/aaaa
      defaultValue: new Date()
        .toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"),
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
          mask: "99.999.999/9999-99",
        },
        {
          id: "ie",
          label: "IE",
          type: "text",
          required: true,
          mask: "999.999.999.999",
        },
        {
          id: "endereco",
          isRow: true,
          fields: [
            {
              id: "endereco",
              label: "END",
              type: "text",
              required: true,
            },
            {
              id: "endNumero",
              label: "Nº",
              type: "text",
              required: true,
            },
            {
              id: "cep",
              label: "CEP",
              type: "text",
              required: true,
              mask: "99999-999",
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
              prefix: "(11)",
              mask: "(99) 9999-9999",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: true,
              prefix: "(11)",
              mask: "(99) 99999-9999",
            },
          ],
        },
        {
          id: "emails",
          isRow: true,
          fields: [
            { id: "email", label: "E-mail", type: "email", required: true },
            {
              id: "emailFin",
              label: "E-mail Financeiro",
              type: "email",
              required: true,
            },
          ],
        },
        {
          id: "suframa",
          label: "Suframa",
          type: "text",
          require: false,
          mask: "99999999",
        },
        { id: "transp", label: "Transportadora", type: "text" },
        {
          id: "tel",
          label: "Telefone",
          type: "tel",
          prefix: "(11)",
          mask: "(99) 9999-9999",
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
          mask: "99.999.999/9999-99",
        },
        {
          id: "ie",
          label: "IE",
          type: "text",
          required: true,
          mask: "999.999.999.999",
        },
        {
          id: "endereco",
          isRow: true,
          fields: [
            {
              id: "endereco",
              label: "END",
              type: "text",
              required: true,
            },
            {
              id: "endNumero",
              label: "Nº",
              type: "text",
              required: true,
            },
            {
              id: "cep",
              label: "CEP",
              type: "text",
              required: true,
              mask: "99999-999",
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
              prefix: "( )",
              mask: "(99) 9999-9999",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: true,
              prefix: "(11)",
              mask: "(99) 99999-9999",
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
          required: true,
        },
      ],
      extras: [
        {
          id: "comissao",
          label: "Comissao",
          type: "text",
          required: false,
          mask: "99.99%",
          defaultValue: "",
        },
        {
          id: "dataRecebimento",
          label: "Data de Recebimento",
          type: "text",
          required: false,
          mask: "99/99/9999",
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
          required: true,
          mask: "99.999.999/9999-99",
        },
        {
          id: "ie",
          label: "IE",
          type: "text",
          required: true,
          mask: "999.999.999.999",
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
              mask: "99999-999",
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
              prefix: "(11)",
              mask: "(99) 9999-9999",
              defaultValue: "",
            },
            {
              id: "celular",
              label: "Tel Cel",
              type: "tel",
              required: false,
              prefix: "(11)",
              mask: "(99) 99999-9999",
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