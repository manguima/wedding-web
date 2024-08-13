export const convertToCentavos = (value: string): number => {
  const numericValue = value.replace(/\D/g, "");
  return parseInt(numericValue, 10);
};

export const convertToFloat = (value: number | string): string => {
  if (typeof value === "number") {
    value = value.toString();
  }

  const numericValue = value.replace(/\D/g, "");
  const floatValue = Number(numericValue) / 100;

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(floatValue);
};

export const parseToFloat = (value: string): number => {
  // Remove os pontos que separam milhares e substitui a vírgula por ponto
  const sanitizedValue = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(sanitizedValue);
};
