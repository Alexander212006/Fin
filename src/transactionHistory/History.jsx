import { CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "../utils/currency";
import { StatCard } from "./components/StatCard";
import { FilterBar } from "./components/FilterBar";
import { TransactionTable } from "./components/TransactionTable";
import { useTransactionHistory } from "./hook/useTransactionHistory";

export const History = ({ transactions }) => {
  const { filters, filteredTransactions, summary } = useTransactionHistory({
    transactions,
  });

  const month = filters.selectedDate.toLocaleDateString("en-US", {
    month: "long",
  });

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-[42px]">
          History
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
          Review all your recorded transactions in one place.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <StatCard
          title="Total entries"
          value={summary.total.toString()}
          subtitle="Transactions recorded this month"
          icon={CreditCard}
        />
        <StatCard
          title="Total income"
          value={formatCurrency(summary.income)}
          subtitle={`${month} income transactions`}
          icon={TrendingUp}
          tone="income"
        />
        <StatCard
          title="Total expense"
          value={formatCurrency(summary.expense)}
          subtitle={`${month} expense transactions`}
          icon={TrendingDown}
          tone="expense"
        />
      </div>

      <div className="space-y-6">
        <FilterBar {...filters} />
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </section>
  );
};
