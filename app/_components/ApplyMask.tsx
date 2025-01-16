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
  
      case "tel":
        return value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4,5})(\d{4})$/, "$1-$2")
          .slice(0, 15);
  
      default:
        return value;
    }
  };