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
import { Cliente, Fornecedor, Transportadora } from "./types";
import { applyMask } from "@/app/_components/ApplyMask";

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
    let maskedValue = value;

    // Aplica a máscara dependendo do campo
    if (name === "cnpj") {
      maskedValue = applyMask(value, "cnpj");
    } else if (name === "telefone") {
      maskedValue = applyMask(value, "tel");
    } else if (name === "celular") {
      maskedValue = applyMask(value, "tel");
    } else if (name === "cep") {
      maskedValue = applyMask(value, "cep");
    }
    setFormData((prev) => ({
      ...prev,
      [name]: maskedValue,
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
                    <Input
                      id={key}
                      name={key}
                      type={fieldType}
                      value={value ?? ""}
                      onChange={handleChange}
                      className="w-full"
                      placeholder={`Digite ${label.toLowerCase()}`}
                    />
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
