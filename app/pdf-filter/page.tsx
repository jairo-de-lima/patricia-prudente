"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { FilterControls } from "./_components/FilterControls";
import { generatePDF } from "./_components/PDFGenerator";
import type { Cliente, Fornecedor, Transportadora } from "./_components/types";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { EntityCard } from "./_components/EntityCard";
import { SearchBar } from "./_components/SearchBar";
import { PDFPreviewModal } from "./_components/PDFPreviewModal";
import { EntityEditForm } from "./_components/EntityEditForm";
import { useToast } from "../_hooks/use-toast";

type EntityType = Cliente | Fornecedor | Transportadora;

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
  const [entities, setEntities] = useState<EntityType[]>([]);
  const [editingEntity, setEditingEntity] = useState<EntityType | null>(null);
  const { toast } = useToast();

  const handleEdit = (entity: EntityType) => {
    setEditingEntity(entity);
  };

  const handleSave = async (updatedEntity: EntityType) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/${selectedType}/${updatedEntity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEntity),
      });
      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Cadastro atualizado com sucesso",
          duration: 2000,
        });
      } else {
        toast({
          title: "Erro",
          description: "Houve um erro ao editar cadastro!",
          duration: 2000,
        });
      }
      setEditingEntity(null); // Fecha o formulário de edição

      // Recarrega os dados para refletir as alterações feitas
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar a entidade."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingEntity(null);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/${selectedType}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Cadastro deletado com sucesso",
          duration: 2000,
        });
      } else {
        toast({
          title: "Erro",
          description: "Não foi possivel deletar cadastro",
          duration: 2000,
        });
      }
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setSelectedItems((prevSelected) =>
        prevSelected.filter((itemId) => itemId !== id)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir o item.");
    } finally {
      setLoading(false);
    }
  };

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

    return data.filter((item) => {
      const razaoSocial = item.razaoSocial?.toLowerCase() || "";
      const codigo = item.codigo?.toLowerCase() || "";
      const cnpj = item.cnpj || "";

      return (
        razaoSocial.includes(searchLower) ||
        codigo.includes(searchLower) ||
        cnpj.includes(searchTerm)
      );
    });
  }, [data, searchTerm]);

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen min-w-screen justify-center items-center">
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
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Modal de edição */}
        {/* {editingEntity && (
          <Dialog open={!!editingEntity} onOpenChange={handleCancel}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Entidade</DialogTitle>
              </DialogHeader>
              <EntityEditForm
                entity={editingEntity}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </DialogContent>
          </Dialog>
        )} */}
        {editingEntity && (
          <EntityEditForm
            entity={editingEntity}
            onSave={handleSave}
            onCancel={handleCancel}
            isOpen={!!editingEntity}
          />
        )}

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
