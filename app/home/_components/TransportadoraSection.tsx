"use client";
import { useEffect, useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Switch } from "@/app/_components/ui/switch";
import { applyMask } from "@/app/_components/ApplyMask";

type Transportadora = {
  id: string;
  razaoSocial: string;
  telefoneFixo: string | null;
  celular: string | null;
};

type TransportadoraSectionProps = {
  onTransportadoraChange: (data: {
    razaoSocial: string;
    telefone: string;
  }) => void;
  reset?: boolean;
};

const TransportadoraSection = ({
  onTransportadoraChange,
  reset,
}: TransportadoraSectionProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [search, setSearch] = useState("");
  const [telefone, setTelefone] = useState("");
  const [results, setResults] = useState<Transportadora[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Reseta o campo quando `reset` mudar para true
  useEffect(() => {
    if (reset) {
      setSearch("");
      setTelefone(""); // Reseta o valor
      handleToggle(false);
      onTransportadoraChange({ razaoSocial: "", telefone: "" });
    }
  }, [reset]);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    if (!checked) {
      // Limpa os campos quando desabilita
      setSearch("");
      setTelefone("");
      onTransportadoraChange({ razaoSocial: "", telefone: "" });
    }
  };

  const handleSearch = async (value: string) => {
    setSearch(value);

    if (value.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(`/api/transportadora`);
      if (!response.ok) throw new Error("Erro ao buscar transportadoras");
      const data = await response.json();

      const filtered = data.filter((t: Transportadora) =>
        t.razaoSocial.toLowerCase().includes(value.toLowerCase())
      );

      setResults(filtered);
      setShowResults(true);
    } catch (error) {
      console.error("Erro ao buscar transportadoras:", error);
      setResults([]);
    }
  };

  const handleSelect = (transportadora: Transportadora) => {
    setSearch(transportadora.razaoSocial);
    setShowResults(false);
    const novoTelefone =
      transportadora.telefoneFixo || transportadora.celular || "";
    setTelefone(novoTelefone);
    onTransportadoraChange({
      razaoSocial: transportadora.razaoSocial,
      telefone: novoTelefone,
    });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const maskedValue = applyMask(inputValue, "tel");
    const novoTelefone = maskedValue;
    setTelefone(novoTelefone);
    onTransportadoraChange({
      razaoSocial: search,
      telefone: novoTelefone,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="usar-transportadora">Usar Transportadora</Label>
        <Switch
          id="usar-transportadora"
          checked={isEnabled}
          onCheckedChange={handleToggle}
        />
      </div>

      {isEnabled && (
        <div className="space-y-4">
          {/* Campo de busca da transportadora */}
          <div className="relative">
            <Label htmlFor="transp">Transportadora</Label>
            <Input
              id="transp"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar transportadora..."
              className="mt-1"
            />

            {showResults && results.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {results.map((transportadora) => (
                  <li
                    key={transportadora.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(transportadora)}
                  >
                    <div>
                      <strong>{transportadora.razaoSocial}</strong>
                      <div className="text-sm text-gray-600">
                        {transportadora.telefoneFixo &&
                          `Tel: ${transportadora.telefoneFixo}`}
                        {transportadora.celular &&
                          !transportadora.telefoneFixo &&
                          `Cel: ${transportadora.celular}`}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Campo de telefone */}
          <div>
            <Label htmlFor="tel">Telefone</Label>
            <Input
              id="tel"
              value={telefone}
              onChange={handleTelefoneChange}
              placeholder="Telefone da transportadora"
              className="mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportadoraSection;
