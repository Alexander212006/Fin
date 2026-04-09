import { CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/currency";
import { StatCard } from "./components/StatCard";
import { FilterBar } from "./components/FilterBar";
import { TransactionTable } from "./components/TransactionTable";
import { useTransactionHistory } from "./hook/useTransactionHistory";
import { useI18n } from "../../i18n";

export const History = ({ transactions, currency, languageRegion }) => {
  const { t } = useI18n();
  const { filters, filteredTransactions, summary } = useTransactionHistory({
    transactions,
  });

  const month = filters.selectedDate.toLocaleDateString(languageRegion, {
    month: "long",
  });

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-[42px]">
          {t("history.title")}
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
          {t("history.subtitle")}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <StatCard
          title={t("history.totalEntries")}
          value={summary.total.toString()}
          subtitle={t("history.transactionsRecordedThisMonth")}
          icon={CreditCard}
        />
        <StatCard
          title={t("history.totalIncome")}
          value={formatCurrency(summary.income, currency, languageRegion)}
          subtitle={`${month} ${t("history.incomeTransactions")}`}
          icon={TrendingUp}
          tone="income"
        />
        <StatCard
          title={t("history.totalExpense")}
          value={formatCurrency(summary.expense, currency, languageRegion)}
          subtitle={`${month} ${t("history.expenseTransactions")}`}
          icon={TrendingDown}
          tone="expense"
        />
      </div>

      <div className="space-y-6">
        <FilterBar {...filters} />
        <TransactionTable
          transactions={filteredTransactions}
          currency={currency}
          languageRegion={languageRegion}
        />
      </div>
    </section>
  );
};
