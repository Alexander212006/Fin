import { memo, useMemo } from "react";
import { StatCard } from "./StatCard";
import { FilterBar } from "./FilterBar";
import { TransactionTable } from "./TransactionTable";
import { getHistoryStatCards } from "../constants/historyStatCards";

export const HistoryView = memo(
  ({
    t,
    summary,
    month,
    filters,
    filteredTransactions,
    currency,
    languageRegion,
  }) => {
    const statCards = getHistoryStatCards({
      t,
      summary,
      month,
      currency,
      languageRegion,
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
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              icon={card.icon}
              tone={card.tone}
            />
          ))}
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
  },
);
