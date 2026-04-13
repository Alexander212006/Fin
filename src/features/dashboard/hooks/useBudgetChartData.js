import { useMemo } from "react";

const getAmount = (value) => Number(value) || 0;

const buildGroupedData = (transactions, type, key, nameResolver) => {
  const grouped = transactions
    .filter((transaction) => transaction.type === type)
    .reduce((accumulator, transaction) => {
      const bucket = transaction[key] || "other";
      accumulator[bucket] = (accumulator[bucket] || 0) + getAmount(transaction.amount);
      return accumulator;
    }, {});

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, label: nameResolver(name), value }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value);
};

export const useBudgetChartData = ({ transactions, t }) =>
  useMemo(() => {
    const incomeTotal = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + getAmount(transaction.amount), 0);

    const expenseTotal = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + getAmount(transaction.amount), 0);

    const incomeBySource = buildGroupedData(
      transactions,
      "income",
      "source",
      (name) => t(`options.incomeSources.${name}`, name),
    );
    const expenseByCategory = buildGroupedData(
      transactions,
      "expense",
      "category",
      (name) => t(`options.expenseCategories.${name}`, name),
    );

    return {
      totalData: [
        { name: t("dashboard.income"), value: incomeTotal },
        { name: t("dashboard.expense"), value: expenseTotal },
      ],
      incomeBySource,
      expenseByCategory,
      hasIncomeBreakdown: incomeBySource.length > 0,
      hasExpenseBreakdown: expenseByCategory.length > 0,
    };
  }, [transactions, t]);
