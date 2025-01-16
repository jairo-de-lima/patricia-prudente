import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import InputMask from "react-input-mask"; // Adicionado InputMask
import { Cliente, Fornecedor, Transportadora } from "./types";

interface EntityEditFormProps<T> {
  entity: T;
  onSave: (updatedEntity: T) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const fieldLabels: Record<string, string> = {
  razaoSocial: "Razão Social",
  codigo: "Código",
  cnpj: "CNPJ",
  inscricaoEstadual: "Inscrição Estadual",
  endereco: "Endereço",
  cidade: "Cidade",
  estado: "Estado",
  cep: "CEP",
  telefone: "Telefone",
  celular: "Celular",
  email: "E-mail",
  emailFinanceiro: "E-mail Financeiro",
  emailComercial: "E-mail Comercial",
  observacoes: "Observações",
  // Adicione mais labels conforme necessário
};

export const EntityEditForm = <
  T extends Cliente | Fornecedor | Transportadora
>({
  entity,
  onSave,
  onCancel,
  isOpen,
}: EntityEditFormProps<T>) => {
  const [formData, setFormData] = useState<T>(entity);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getFieldType = (key: string, value: any): string => {
    if (key.includes("email")) return "email";
    if (key.includes("telefone") || key.includes("celular")) return "tel";
    if (key.includes("cnpj")) return "text";
    if (typeof value === "number") return "number";
    return "text";
  };

  const getFieldMask = (key: string): string | undefined => {
    if (key === "cnpj") return "99.999.999/9999-99";
    if (key === "cep") return "99999-999";
    if (key === "telefone" || key === "celular") return "(99) 99999-9999";
    if (key === "dataCad" || key === "dataRecebimento") return "99/99/9999";
    if (key === "comissao") return "99.99%";
    return undefined;
  };

  const getEntityType = (entity: T): string => {
    if ("type" in entity) {
      return entity.type as string;
    }
    return "Registro";
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar {getEntityType(entity)}</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias nos campos abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] px-1">
            <div className="grid grid-cols-2 gap-4 p-1">
              {Object.entries(formData).map(([key, value]) => {
                if (
                  key === "id" ||
                  key === "createdAt" ||
                  key === "updatedAt"
                ) {
                  return null;
                }

                const label = fieldLabels[key] || key;
                const isOptional = key.includes("?");
                const fieldType = getFieldType(key, value);
                const fieldMask = getFieldMask(key);

                return (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-sm font-medium">
                      {label}
                      {isOptional && (
                        <span className="text-gray-400 text-sm ml-1">
                          (opcional)
                        </span>
                      )}
                    </Label>
                    {fieldMask ? (
                      <InputMask
                        mask={fieldMask}
                        value={value ?? ""}
                        onChange={handleChange}
                      >
                        {(inputProps) => (
                          <Input
                            {...inputProps}
                            id={key}
                            name={key}
                            type={fieldType}
                            className="w-full"
                            placeholder={`Digite ${label.toLowerCase()}`}
                          />
                        )}
                      </InputMask>
                    ) : (
                      <Input
                        id={key}
                        name={key}
                        type={fieldType}
                        value={value ?? ""}
                        onChange={handleChange}
                        className="w-full"
                        placeholder={`Digite ${label.toLowerCase()}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <DialogFooter className="mt-6">
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">Salvar alterações</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
