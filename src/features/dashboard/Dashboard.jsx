import { DashboardView } from "./components/DashboardView";
import { useDashboardData } from "./hooks/useDashboardData";

export const Dashboard = ({
  transactions,
  setTransactions,
  currency,
  languageRegion,
}) => {
  const { balance, accountBalances } = useDashboardData({
    transactions,
    currency,
    languageRegion,
  });

  return (
    <DashboardView
      balance={balance}
      accountBalances={accountBalances}
      transactions={transactions}
      setTransactions={setTransactions}
      currency={currency}
      languageRegion={languageRegion}
    />
  );
};
