import { format } from "date-fns";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface EntityCardProps {
  entity: any;
  selected: boolean;
  onClick: () => void;
}

export const EntityCard = ({ entity, selected, onClick }: EntityCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-lg border p-4 transition-colors
        ${
          selected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
        }
      `}
    >
      {selected && (
        <div className="absolute top-2 right-2">
          <Check className="h-5 w-5 text-blue-500" />
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Código: {entity.codigo}
          </span>
          <span className="text-sm text-gray-500">
            {format(new Date(entity.dataCad), "dd/MM/yyyy")}
          </span>
        </div>

        <h3 className="font-medium text-gray-900">{entity.razaoSocial}</h3>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
          <div>CNPJ: {entity.cnpj}</div>
          <div>IE: {entity.ie}</div>
        </div>
      </div>
    </motion.div>
  );
};
