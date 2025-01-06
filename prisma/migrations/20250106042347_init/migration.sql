-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefoneFixo" TEXT,
    "celular" TEXT,
    "email" TEXT NOT NULL,
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
    "celular" TEXT,
    "emailPedido" TEXT NOT NULL,
    "comissao" DOUBLE PRECISION,
    "dataRecebimento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transportadora" (
    "id" TEXT NOT NULL,
    "numeroNF" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "dataSaida" TIMESTAMP(3) NOT NULL,
    "codigo" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transportadora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClienteToTransportadora" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClienteToTransportadora_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FornecedorToTransportadora" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FornecedorToTransportadora_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE INDEX "_ClienteToTransportadora_B_index" ON "_ClienteToTransportadora"("B");

-- CreateIndex
CREATE INDEX "_FornecedorToTransportadora_B_index" ON "_FornecedorToTransportadora"("B");

-- AddForeignKey
ALTER TABLE "_ClienteToTransportadora" ADD CONSTRAINT "_ClienteToTransportadora_A_fkey" FOREIGN KEY ("A") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClienteToTransportadora" ADD CONSTRAINT "_ClienteToTransportadora_B_fkey" FOREIGN KEY ("B") REFERENCES "Transportadora"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FornecedorToTransportadora" ADD CONSTRAINT "_FornecedorToTransportadora_A_fkey" FOREIGN KEY ("A") REFERENCES "Fornecedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FornecedorToTransportadora" ADD CONSTRAINT "_FornecedorToTransportadora_B_fkey" FOREIGN KEY ("B") REFERENCES "Transportadora"("id") ON DELETE CASCADE ON UPDATE CASCADE;
