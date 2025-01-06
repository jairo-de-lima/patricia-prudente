-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "emailFin" TEXT NOT NULL,
    "telefoneFixo" TEXT,
    "celular" TEXT,
    "email" TEXT NOT NULL,
    "inscEstad" TEXT NOT NULL,
    "suframa" TEXT,
    "transportadora" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "fornecedor" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefoneFixo" TEXT,
    "cep" TEXT NOT NULL,
    "emailFin" TEXT NOT NULL,
    "celular" TEXT,
    "emailPedido" TEXT NOT NULL,
    "inscEstad" TEXT NOT NULL,
    "comissao" DOUBLE PRECISION,
    "dataRecebimento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportadoras" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "transportadora" TEXT NOT NULL,
    "numeroNF" TEXT NOT NULL,
    "descricao" TEXT,
    "quantidade" INTEGER NOT NULL,
    "valorUn" DOUBLE PRECISION NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "dataSaida" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" TEXT,
    "fornecedorId" TEXT,

    CONSTRAINT "transportadoras_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_codigo_key" ON "Cliente"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cnpj_key" ON "Cliente"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_codigo_key" ON "Fornecedor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "transportadoras_codigo_key" ON "transportadoras"("codigo");

-- AddForeignKey
ALTER TABLE "transportadoras" ADD CONSTRAINT "transportadoras_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportadoras" ADD CONSTRAINT "transportadoras_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
