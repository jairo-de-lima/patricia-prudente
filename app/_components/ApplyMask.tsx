export const applyMask = (value: string, mask: string): string => {
  if (!value) return "";

  // Remove todos os caracteres não numéricos
  const cleanValue = value.replace(/\D/g, "");

  switch (mask) {
    case "comissao": {
      // Limita a 5 dígitos para permitir 100,00%
      const limitedValue = cleanValue.slice(0, 5);

      // Adiciona a vírgula para separar as casas decimais
      const formattedValue = limitedValue.replace(/(\d+)(\d{2})$/, "$1,$2");

      return `${formattedValue}%`;
    }

    case "cep":
      return cleanValue.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);

    case "cnpj":
      return cleanValue
        .replace(/^(\d{2})(\d{0,3})/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d{0,3})/, "$1.$2.$3")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d{0,4})/, "$1.$2.$3/$4")
        .replace(
          /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{0,2})/,
          "$1.$2.$3/$4-$5"
        )
        .slice(0, 18);

    case "tel": {
      // Limita a 11 dígitos (máximo para celular)
      const limitedValue = cleanValue.slice(0, 11);

      if (limitedValue.length <= 10) {
        // Telefone fixo: (XX) XXXX-XXXX
        return limitedValue
          .replace(/^(\d{2})(\d{0,4})(\d{0,4})/, "($1) $2-$3")
          .slice(0, 14);
      } else {
        // Celular: (XX) XXXXX-XXXX
        return limitedValue
          .replace(/^(\d{2})(\d{0,5})(\d{0,4})/, "($1) $2-$3")
          .slice(0, 15);
      }
    }

    case "ie": {
      // Limita a 14 dígitos (máximo para IE)
      const limitedValue = cleanValue.slice(0, 14);

      switch (limitedValue.length) {
        case 8: // RJ, AP
          return limitedValue.replace(
            /^(\d{2})(\d{3})(\d{2})(\d{1})/,
            "$1.$2.$3-$4"
          );

        case 9: // SP, MS, MT, TO
          return limitedValue.replace(/^(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");

        case 10: // RS, PR
          return limitedValue.replace(/^(\d{3})(\d{7})/, "$1/$2");

        case 11: // SC
          return limitedValue.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3.$4"
          );

        case 12: // SP (alguns casos)
          return limitedValue.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{3})/,
            "$1.$2.$3.$4"
          );

        case 13: // MG
          return limitedValue.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{4})/,
            "$1.$2.$3/$4"
          );

        case 14: // outros casos
          return limitedValue.replace(
            /^(\d{4})(\d{3})(\d{3})(\d{4})/,
            "$1.$2.$3.$4"
          );

        default:
          return limitedValue;
      }
    }

    case "suframa": {
      // Formato SUFRAMA: XX.XXXX.XXX
      return cleanValue
        .replace(/^(\d{2})(\d{0,4})(\d{0,3})/, "$1.$2.$3")
        .slice(0, 11); // 8 dígitos + 2 pontos
    }

    default:
      // Para máscaras personalizadas usando padrão de 9's
      if (typeof mask === "string" && mask.includes("9")) {
        let result = "";
        let valueIndex = 0;

        for (
          let i = 0;
          i < mask.length && valueIndex < cleanValue.length;
          i++
        ) {
          if (mask[i] === "9") {
            result += cleanValue[valueIndex] || "";
            valueIndex++;
          } else {
            result += mask[i];
            if (
              valueIndex < cleanValue.length &&
              cleanValue[valueIndex] === mask[i]
            ) {
              valueIndex++;
            }
          }
        }
        return result;
      }
      return value;
  }
};
