-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "dataCad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codigo" TEXT,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "endNumero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "telefoneFixo" TEXT,
    "celular" TEXT,
    "email" TEXT,
    "emailFin" TEXT,
    "suframa" TEXT,
    "transp" TEXT,
    "tel" TEXT,
    "NumeroNF" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedores" (
    "id" TEXT NOT NULL,
    "dataCad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codigo" TEXT,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "endNumero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "telefoneFixo" TEXT,
    "celular" TEXT,
    "emailPedido" TEXT,
    "emailFin" TEXT NOT NULL,
    "comissao" TEXT,
    "dataRecebimento" TIMESTAMP(3),
    "obs" TEXT,
    "NumeroNF" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fornecedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportadoras" (
    "id" TEXT NOT NULL,
    "dataCad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codigo" TEXT,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "endereco" TEXT,
    "endNumero" TEXT,
    "cep" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "telefoneFixo" TEXT,
    "celular" TEXT,
    "email" TEXT,
    "emailFina" TEXT,
    "obs" TEXT,
    "NumeroNF" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" TEXT,
    "fornecedorId" TEXT,

    CONSTRAINT "transportadoras_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cnpj_key" ON "clientes"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_ie_key" ON "clientes"("ie");

-- CreateIndex
CREATE UNIQUE INDEX "fornecedores_cnpj_key" ON "fornecedores"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "fornecedores_ie_key" ON "fornecedores"("ie");

-- CreateIndex
CREATE UNIQUE INDEX "transportadoras_cnpj_key" ON "transportadoras"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "transportadoras_ie_key" ON "transportadoras"("ie");

-- AddForeignKey
ALTER TABLE "transportadoras" ADD CONSTRAINT "transportadoras_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportadoras" ADD CONSTRAINT "transportadoras_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
