import { useI18n } from "../../../i18n";
import { useBudgetChartData } from "../hooks/useBudgetChartData";
import { BudgetChartView } from "./BudgetChartView";

export const BudgetChart = ({ transactions = [], currency, languageRegion }) => {
  const { t } = useI18n();
  const {
    totalData,
    incomeBySource,
    expenseByCategory,
    hasIncomeBreakdown,
    hasExpenseBreakdown,
  } = useBudgetChartData({
    transactions,
    t,
  });

  return (
    <BudgetChartView
      t={t}
      totalData={totalData}
      incomeBySource={incomeBySource}
      expenseByCategory={expenseByCategory}
      hasIncomeBreakdown={hasIncomeBreakdown}
      hasExpenseBreakdown={hasExpenseBreakdown}
      currency={currency}
      languageRegion={languageRegion}
    />
  );
};
