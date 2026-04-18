import { memo } from "react";
import { useI18n } from "../../i18n";
import { HistoryView } from "./components/HistoryView";
import { useHistoryData } from "./hook/useHistoryData";

export const History = memo(({ transactions, currency, languageRegion }) => {
  const { t } = useI18n();
  const { filters, filteredTransactions, summary, month } = useHistoryData({
    transactions,
    languageRegion,
  });

  return (
    <HistoryView
      t={t}
      summary={summary}
      month={month}
      filters={filters}
      filteredTransactions={filteredTransactions}
      currency={currency}
      languageRegion={languageRegion}
    />
  );
});

