import React from "react";
import { Checkbox } from "@/app/_components/ui/checkbox";

interface DataListProps {
  type: string;
  data: any[];
  selectedItems: string[];
  setSelectedItems: (items: string[] | ((prev: string[]) => string[])) => void;
  loading: boolean;
}

export const DataList: React.FC<DataListProps> = ({
  type,
  data,
  selectedItems,
  setSelectedItems,
  loading,
}) => {
  const handleSelect = (id: string) => {
    setSelectedItems((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((item: string) => item !== id)
        : [...prev, id]
    );
  };

  if (loading) return <p>Carregando {type}...</p>;
  if (!data.length) return <p>Nenhum dado encontrado para {type}.</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id} className="flex items-center gap-2">
          <Checkbox
            checked={selectedItems.includes(item.id)}
            onChange={() => handleSelect(item.id)}
          />
          {item.razaoSocial || item.codigo}
        </li>
      ))}
    </ul>
  );
};
