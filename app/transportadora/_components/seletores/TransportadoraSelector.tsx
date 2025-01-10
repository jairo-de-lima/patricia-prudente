"use client";
import React from "react";
import { Transportadora } from '../interfaces/Transportadora';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";

interface TransportadoraSelectorProps {
  transportadoras: Transportadora[];
  selectedTransportadora: Transportadora | null;
  setSelectedTransportadora: React.Dispatch<React.SetStateAction<Transportadora | null>>;
}

const TransportadoraSelector: React.FC<TransportadoraSelectorProps> = ({
  transportadoras,
  selectedTransportadora,
  setSelectedTransportadora
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transportadora</CardTitle>
      </CardHeader>
      <CardContent>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedTransportadora?.razaoSocial || ""}
          onChange={(e) =>
            setSelectedTransportadora(
              transportadoras.find((t) => t.id === e.target.value) || null
            )
          }
        >
          <option value="">Selecione uma transportadora</option>
          {transportadoras.map((transportadora) => (
            <option key={transportadora.id} value={transportadora.id}>
              {transportadora.razaoSocial} - NF: {transportadora.NumeroNF}
            </option>
          ))}
        </select>
      </CardContent>
    </Card>
  );
};

export default TransportadoraSelector;
