import { Balance } from "./Balance";
import { TransactionHistory } from "./TransactionHistory";
import { BudgetChart } from "./BudgetChart";
import { useI18n } from "../../../i18n";
import { memo } from "react";

export const DashboardView = memo(
  ({
    balance,
    accountBalances,
    transactions,
    setTransactions,
    currency,
    languageRegion,
  }) => {
    const { t } = useI18n();

    return (
      <section>
        <h2 className="mb-6 text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 lg:hidden sm:text-[42px]">
          {t("dashboard.title")}
        </h2>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="space-y-6">
            <Balance balance={balance} accountBalances={accountBalances} />
            <TransactionHistory
              transactions={transactions}
              setTransactions={setTransactions}
              currency={currency}
              languageRegion={languageRegion}
            />
          </div>

          <BudgetChart
            transactions={transactions}
            currency={currency}
            languageRegion={languageRegion}
          />
        </div>
      </section>
    );
  },
);
