
export const formatCurrency = (amount, currency = "PHP", languageRegion) => {
  return amount.toLocaleString(languageRegion, {
    style: "currency",
    currency,
  });
};

export const formatCompactPeso = (amount, type, currency = "PHP", languageRegion) => {
  return `${type === "income" ? "+" : "-"} ${formatCurrency(amount, currency, languageRegion)}`;
};
