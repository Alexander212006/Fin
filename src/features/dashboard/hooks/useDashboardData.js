import { useMemo } from "react";
import { ACCOUNTS } from "../../../constants/accounts";
import { formatCurrency } from "../../../utils/currency";
import { useDashboardBalance } from "./useDashboardBalance";

export const useDashboardData = ({
  transactions,
  currency,
  languageRegion,
}) => {
  const balance = useDashboardBalance({
    transactions,
    currency,
    languageRegion,
  });

  const accountBalances = useMemo(() => {
    const totals = {};

    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;
      const value = transaction.type === "income" ? amount : -amount;

      totals[transaction.account] = (totals[transaction.account] || 0) + value;
    });

    return ACCOUNTS.map((account) => ({
      value: account.value,
      label: account.label,
      balance: formatCurrency(
        totals[account.value] || 0,
        currency,
        languageRegion,
      ),
    }));
  }, [transactions, currency, languageRegion]);

  return {
    balance,
    accountBalances,
  };
};
