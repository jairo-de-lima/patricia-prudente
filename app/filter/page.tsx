"use client";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { FilterControls } from "./_components/FilterControls";
import { generatePDF } from "./_components/PDFGenerator"; // mantém o mesmo do exemplo anterior
import type { Cliente, Fornecedor, Transportadora } from "./_components/types"; // mantém o mesmo do exemplo anterior
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

import { SearchBar } from "./_components/SearchBar";
import { PDFPreviewModal } from "./_components/PDFPreviewModal";
import { EntityCard } from "./_components/EntityCard";

export default function FilterAndPDFGenerator() {
  const [selectedType, setSelectedType] = useState<string>("clientes");
  const [data, setData] = useState<(Cliente | Fornecedor | Transportadora)[]>(
    []
  );
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const loadData = async () => {
    setLoading(true);
    setError(null);
    setSelectedItems([]);
    setSearchTerm("");
    try {
      const response = await fetch(`/api/${selectedType}`);
      if (!response.ok) throw new Error(`Erro ao carregar ${selectedType}`);
      const newData = await response.json();
      setData(newData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : `Erro ao carregar ${selectedType}`
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, [selectedType]);
  const handleGeneratePDF = async (preview: boolean = false) => {
    try {
      setLoading(true);
      const selectedData = data.filter((item) =>
        selectedItems.includes(item.id)
      );
      const pdfBytes = await generatePDF({ selectedType, selectedData });
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      if (preview) {
        setPdfPreview(url);
        setIsPreviewOpen(true);
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = `cadastro_${selectedType}_${new Date().getTime()}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      setError("Erro ao gerar o PDF. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    if (pdfPreview) {
      window.URL.revokeObjectURL(pdfPreview);
      setPdfPreview(null);
    }
  };
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const searchLower = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.razaoSocial.toLowerCase().includes(searchLower) ||
        item.codigo.toLowerCase().includes(searchLower) ||
        item.cnpj.includes(searchTerm)
    );
  }, [data, searchTerm]);
  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen min-w-scren justify-center items-center">
        <Card className="w-[90%] max-w-6xl mx-auto p-6">
          <CardContent className="space-y-6">
            <FilterControls
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              onPreviewPDF={() => handleGeneratePDF(true)}
              onDownloadPDF={() => handleGeneratePDF(false)}
              onRefresh={loadData}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              disabled={selectedItems.length === 0 || loading}
              selectedCount={selectedItems.length}
              loading={loading}
            />
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={`Buscar ${
                selectedType === "clientes"
                  ? "cliente"
                  : selectedType === "fornecedores"
                  ? "fornecedor"
                  : "transportadora"
              } por nome, código ou CNPJ...`}
            />
            {error && (
              <div className="text-red-500 p-4 rounded bg-red-50">{error}</div>
            )}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {filteredData.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {searchTerm
                      ? "Nenhum resultado encontrado"
                      : "Nenhum item disponível"}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredData.map((item) => (
                      <EntityCard
                        key={item.id}
                        entity={item}
                        selected={selectedItems.includes(item.id)}
                        onClick={() => toggleSelection(item.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
        <PDFPreviewModal
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          pdfUrl={pdfPreview}
          onDownload={() => handleGeneratePDF(false)}
        />
      </div>
      <Footer />
    </div>
  );
}


