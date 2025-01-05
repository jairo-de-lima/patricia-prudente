import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import FilterPage from "./_components/Filter";

// Dados de exemplo
const fornecedores = [
  { nome: "Fornecedor A", cnpj: "12.345.678/0001-99", codigo: "F123" },
  { nome: "Fornecedor B", cnpj: "98.765.432/0001-10", codigo: "F124" },
];

const clientes = [
  { nome: "Cliente X", cnpj: "23.456.789/0001-11", codigo: "C123" },
  { nome: "Cliente Y", cnpj: "87.654.321/0001-22", codigo: "C124" },
];

const transportadoras = [
  { nome: "Transportadora Z", codigo: "TRANS123", nf: "NF-456789" },
  { nome: "Transportadora Y", codigo: "TRANS124", nf: "NF-456790" },
];

const Filter = () => {
  return (
    <div>
      <Navbar />
      <FilterPage
        fornecedores={fornecedores}
        clientes={clientes}
        transportadoras={transportadoras}
      />
      <Footer />
    </div>
  );
};

export default Filter;
