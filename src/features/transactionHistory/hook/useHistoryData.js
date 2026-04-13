import { useMemo } from "react";
import { useTransactionHistory } from "./useTransactionHistory";

export const useHistoryData = ({
  transactions,
  languageRegion,
}) => {
  const { filters, filteredTransactions, summary } = useTransactionHistory({
    transactions,
  });

  const month = useMemo(
    () =>
      filters.selectedDate.toLocaleDateString(languageRegion, {
        month: "long",
      }),
    [filters.selectedDate, languageRegion],
  );

  return {
    filters,
    filteredTransactions,
    summary,
    month,
  };
};
