import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Download, Eye, RefreshCw } from "lucide-react";
import { SearchBar } from "./SearchBar";

interface FilterControlsProps {
  selectedType: string;
  onTypeChange: (value: string) => void;
  onPreviewPDF: () => void;
  onDownloadPDF: () => void;
  onRefresh: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  disabled: boolean;
  selectedCount: number;
  loading: boolean;
}

export const FilterControls = ({
  selectedType,
  onTypeChange,
  onPreviewPDF,
  onDownloadPDF,
  onRefresh,
  searchTerm,
  onSearchChange,
  disabled,
  selectedCount,
  loading,
}: FilterControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-[200px]">
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clientes">Clientes</SelectItem>
              <SelectItem value="fornecedores">Fornecedores</SelectItem>
              <SelectItem value="transportadoras">Transportadoras</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onPreviewPDF}
            variant="outline"
            disabled={disabled}
            className="flex-1 sm:flex-none"
          >
            <Eye className="h-4 w-4 mr-2" />
            Visualizar {selectedCount > 0 && `(${selectedCount})`}
          </Button>

          <Button
            onClick={onDownloadPDF}
            disabled={disabled}
            className="flex-1 sm:flex-none"
          >
            <Download className="h-4 w-4 mr-2" />
            Download {selectedCount > 0 && `(${selectedCount})`}
          </Button>

          <Button
            onClick={onRefresh}
            variant="outline"
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Atualizar
          </Button>
        </div>
      </div>
    </div>
  );
};
