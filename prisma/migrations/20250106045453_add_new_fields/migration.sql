/*
  Warnings:

  - Added the required column `cep` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailFin` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscEstad` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailFin` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscEstad` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "emailFin" TEXT NOT NULL,
ADD COLUMN     "inscEstad" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Fornecedor" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "emailFin" TEXT NOT NULL,
ADD COLUMN     "inscEstad" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transportadora" ALTER COLUMN "numeroNF" DROP NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL,
ALTER COLUMN "quantidade" DROP NOT NULL,
ALTER COLUMN "unidade" DROP NOT NULL,
ALTER COLUMN "dataSaida" DROP NOT NULL,
ALTER COLUMN "codigo" DROP NOT NULL,
ALTER COLUMN "valorTotal" DROP NOT NULL;
