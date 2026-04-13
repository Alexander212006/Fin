import { CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../../utils/currency";

export const getHistoryStatCards = ({
  t,
  summary,
  month,
  currency,
  languageRegion,
}) => [
  {
    title: t("history.totalEntries"),
    value: summary.total.toString(),
    subtitle: t("history.transactionsRecordedThisMonth"),
    icon: CreditCard,
    tone: "default",
  },
  {
    title: t("history.totalIncome"),
    value: formatCurrency(summary.income, currency, languageRegion),
    subtitle: `${month} ${t("history.incomeTransactions")}`,
    icon: TrendingUp,
    tone: "income",
  },
  {
    title: t("history.totalExpense"),
    value: formatCurrency(summary.expense, currency, languageRegion),
    subtitle: `${month} ${t("history.expenseTransactions")}`,
    icon: TrendingDown,
    tone: "expense",
  },
];
