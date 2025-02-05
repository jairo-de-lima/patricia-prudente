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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

interface EntityEditFormProps<T> {
  entity: T;
  onSave: (updatedEntity: T) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const fieldLabels: Record<string, string> = {
  dataCad: "Cadastrado",
  razaoSocial: "Razão Social",
  ie: "I.E",
  codigo: "Código",
  cnpj: "CNPJ",
  inscricaoEstadual: "Inscrição Estadual",
  endereco: "Endereço",
  cidade: "Cidade",
  bairro: "Bairro",
  estado: "Estado",
  cep: "CEP",
  telefoneFixo: "Telefone Fixo",
  endNumero: "Nº",
  telefone: "Telefone",
  celular: "Celular",
  email: "E-mail",
  emailFin: "E-mail Financeiro",
  emailFina: "E-mail Financeiro",
  suframa: "Suframa",
  observacoes: "Observações",
  transp: "Transportadora",
  tel: "Telefone",
  dataRecebimento: "Data de Recebimento",
  obs: "Observações",
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
    const { name, value, type } = e.target;
    let updatedValue = value;
    let maskedValue = value;

    if (type === "date") {
      updatedValue = new Date(value).toISOString(); // Converte para o formato ISO
    }

    // Aplica a máscara dependendo do campo
    if (name === "cnpj") {
      maskedValue = applyMask(value, "cnpj");
    } else if (name === "telefoneFixo") {
      maskedValue = applyMask(value, "tel");
    } else if (name === "celular") {
      maskedValue = applyMask(value, "tel");
    } else if (name === "cep") {
      maskedValue = applyMask(value, "cep");
    } else if (name === "suframa") {
      maskedValue = applyMask(value, "suframa");
    } else if (name === "comissao") {
      maskedValue = applyMask(value, "comissao");
    } else if (name === "ie") {
      maskedValue = applyMask(value, "ie");
    }
    setFormData((prev) => ({
      ...prev,
      [name]: maskedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    console.log("Form data:", formData);
  };

  const getFieldType = (key: string, value: any): string => {
    if (key.includes("email")) return "email";
    if (key.includes("telefone") || key.includes("celular")) return "tel";
    if (key.includes("cnpj")) return "text";
    if (key.includes("dataCad") || key.includes("dataRecebimento"))
      return "date";
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
                  key === "updatedAt" ||
                  key === "clienteId" ||
                  key === "fornecedorId"
                ) {
                  return null;
                }

                // verifica se e uma string no valor de data ISO
                const isISODateString =
                  typeof value === "string" &&
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);

                // formata a data em formato ISO para o formato dd/MM/yyyy, HH:mm:ss
                const formattedValue = isISODateString
                  ? format(new Date(value), "yyyy-MM-dd") // Ajustado para o formato do input type="date"
                  : value;

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
                      value={formattedValue ?? ""}
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
