
import { Balance } from "./components/Balance";
import { TransactionHistory } from "./components/TransactionHistory";
import { BudgetChart } from "./components/BudgetChart";
import { useI18n } from "../../i18n";
import { useDashboardBalance } from "./hooks/useDashboardBalance";
import { ACCOUNTS } from "../../constants/accounts";
import { formatCurrency } from "../../utils/currency";
import { useMemo } from "react";

export const Dashboard = ({ transactions, setTransactions, currency, languageRegion }) => {
  const { t } = useI18n();
  const balance = useDashboardBalance({
    transactions,
    currency,
    languageRegion,
  });

  const accountBalances = useMemo(() => {
  const totals = {};

  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount) || 0;
    const value =
      transaction.type === "income" ? amount : -amount;

    totals[transaction.account] =
      (totals[transaction.account] || 0) + value;
  });

  return ACCOUNTS.map((account) => ({
    value: account.value,
    label: account.label,
    balance: formatCurrency(
      totals[account.value] || 0,
      currency,
      languageRegion
    ),
  }));
  
}, [transactions, currency, languageRegion]);


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
};
