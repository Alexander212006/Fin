import { formatCurrency } from "../../utils/currency";
import { Balance } from "./components/Balance";
import { TransactionHistory } from "./components/TransactionHistory";
import { BudgetChart } from "./components/BudgetChart";
import { useMemo } from "react";
import { useI18n } from "../../i18n";

export const Dashboard = ({ transactions, setTransactions, currency, languageRegion }) => {
  const { t } = useI18n();
  const balance = useMemo(() => {
    const total = transactions.reduce(
      (acc, transaction) =>
        acc +
        (transaction.type === "income"
          ? transaction.amount
          : -transaction.amount),
      0,
    );

    return formatCurrency(total, currency, languageRegion);
  }, [transactions, currency, languageRegion]);

  return (
    <section>
      <h2 className="mb-6 text-3xl font-semibold tracking-tight text-zinc-800 lg:hidden sm:text-[42px]">
        {t("dashboard.title")}
      </h2>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-6">
          <Balance balance={balance} />
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
};
