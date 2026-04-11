import { Wallet } from "lucide-react";
import { useI18n } from "../../../i18n";

export const Balance = ({ balance, accountBalances = [] }) => {
  const { t } = useI18n();

  return (
    <div className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 sm:p-7">
      <div className="mb-10 flex items-start gap-4">
        <div className="rounded-2xl bg-zinc-300 dark:bg-zinc-600 p-3 text-white">
          <Wallet className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100">{t("dashboard.myBalance")}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("dashboard.balanceOverview")}</p>
        </div>
      </div>

      <p className="text-4xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-[48px]">
        {balance}
      </p>

      <div className="mt-8 space-y-3 border-t border-zinc-200 pt-5 dark:border-zinc-700">
        {accountBalances.map((account) => (
          <div key={account.value} className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {t(`options.accounts.${account.value}`, account.label)}
            </p>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              {account.balance}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
