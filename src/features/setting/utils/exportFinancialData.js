const CSV_HEADERS = [
  "id",
  "type",
  "title",
  "amount",
  "category",
  "source",
  "account",
  "date",
  "notes",
];

const formatCsvValue = (value) => {
  const safeValue = value ?? "";
  const normalizedValue = String(safeValue);
  const escapedValue = normalizedValue.replaceAll('"', '""');
  return `"${escapedValue}"`;
};

const buildCsvRow = (transaction) => {
  const values = [
    transaction?.id,
    transaction?.type,
    transaction?.title,
    transaction?.amount,
    transaction?.category,
    transaction?.source,
    transaction?.account,
    transaction?.date,
    transaction?.notes,
  ];

  return values.map((value) => formatCsvValue(value)).join(",");
};

export const exportFinancialDataCsv = (transactions = []) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const rows = transactions.map((transaction) => buildCsvRow(transaction));
  const csvContent = [CSV_HEADERS.join(","), ...rows].join("\r\n");
  const blob = new Blob(["\uFEFF", csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.setAttribute("download", `financial-data-${dateStamp}.csv`);
  document.body.append(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  return true;
};
