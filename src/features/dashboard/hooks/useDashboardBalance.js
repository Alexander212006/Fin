import { useMemo } from "react";
import { formatCurrency } from "../../../utils/currency";

export const useDashboardBalance = ({
  transactions,
  currency,
  languageRegion,
}) =>
  useMemo(() => {
    const total = transactions.reduce(
      (accumulator, transaction) =>
        accumulator +
        (transaction.type === "income"
          ? transaction.amount
          : -transaction.amount),
      0,
    );

    return formatCurrency(total, currency, languageRegion);
  }, [transactions, currency, languageRegion]);
