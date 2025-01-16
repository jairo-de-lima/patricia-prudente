"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

type FormSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const FormSelector = ({ value, onValueChange }: FormSelectorProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="w-[200px]">
          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo de cadastro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cliente">Cadastro de Cliente</SelectItem>
              <SelectItem value="fornecedor">Cadastro de Fornecedor</SelectItem>
              <SelectItem value="transportadora">
                Cadastro de Transportadora
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Selecione o tipo de cadastro</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default FormSelector;