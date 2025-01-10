import { Input } from "@/app/_components/ui/input";
import { Search } from "lucide-react";
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full"
      />
    </div>
  );
};