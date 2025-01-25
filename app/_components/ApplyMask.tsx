export const applyMask = (value: string, type: string): string => {
  if (!value) return "";

  switch (type) {
    case "cep":
      return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 9);

    case "cnpj":
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 18);

    case "tel": {
      // Formatação para 8 ou 9 dígitos
      const cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length <= 10) {
        // Formato para telefone fixo (8 dígitos)
        return cleanedValue
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d{4})$/, "$1-$2");
      } else {
        // Formato para celular (9 dígitos)
        return cleanedValue
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d{4})$/, "$1-$2");
      }
    }
    case "ie": // Exemplo: formato de Inscrição Estadual
      return value.replace(/\D/g, "").slice(0, 12);
    case "codigo": // Apenas números
      return value.replace(/\D/g, "").slice(0, 10);

    default:
      return value;
  }
};
