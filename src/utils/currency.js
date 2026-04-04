export const formatCurrency = (amount) => {
  return amount.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
};

export const formatCompactPeso = (amount, type) => {
  return `${type === "income" ? "+" : "-"} ${formatCurrency(amount)}`;
};
